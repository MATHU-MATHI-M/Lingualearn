import React, { useState, useEffect } from 'react';
import { Volume2, Mic, RotateCcw, ArrowLeft, CheckCircle, XCircle, Star } from 'lucide-react';
import { getWordsForLanguage, Word } from '../data/languages';
import { UserProgress } from '../App';

// Declare SpeechRecognition for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface LearningModeProps {
  language: string;
  userProgress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  onAddXP: (amount: number) => void;
  onBackToLibrary: () => void;
}

const LearningMode: React.FC<LearningModeProps> = ({
  language,
  userProgress,
  onUpdateProgress,
  onAddXP,
  onBackToLibrary
}) => {
  const [words] = useState<Word[]>(getWordsForLanguage(language));
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [pronunciationFeedback, setPronunciationFeedback] = useState<{
    accuracy: number;
    feedback: string;
  } | null>(null);
  const [sessionStats, setSessionStats] = useState({
    wordsStudied: 0,
    correctPronunciations: 0,
    totalAttempts: 0
  });

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const spokenWord = event.results[0][0].transcript.toLowerCase().trim();
        const targetWord = currentWord.word.toLowerCase();
        
        // Simple pronunciation accuracy calculation
        const similarity = calculateSimilarity(spokenWord, targetWord);
        const accuracy = Math.round(similarity * 100);

        setPronunciationFeedback({
          accuracy,
          feedback: accuracy >= 70 ? 'Great pronunciation!' : 
                   accuracy >= 50 ? 'Good effort, try again!' : 
                   'Keep practicing!'
        });

        setSessionStats(prev => ({
          ...prev,
          correctPronunciations: accuracy >= 70 ? prev.correctPronunciations + 1 : prev.correctPronunciations,
          totalAttempts: prev.totalAttempts + 1
        }));

        if (accuracy >= 70) {
          onAddXP(10);
        }

        setIsRecording(false);
      };

      recognitionInstance.onerror = () => {
        setIsRecording(false);
        setPronunciationFeedback({
          accuracy: 0,
          feedback: 'Could not detect speech. Try again!'
        });
      };

      setRecognition(recognitionInstance);
    }
  }, [language, currentWord, onAddXP]);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const speakWord = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      // Set language with fallback options for Tamil
      if (language === 'ta') {
        utterance.lang = 'ta-IN';
        // If Tamil voice not available, try these alternatives
        const voices = speechSynthesis.getVoices();
        const tamilVoice = voices.find(voice => 
          voice.lang.includes('ta') || 
          voice.name.toLowerCase().includes('tamil') ||
          voice.lang.includes('hi-IN') // Hindi as fallback for similar phonetics
        );
        if (tamilVoice) {
          utterance.voice = tamilVoice;
        }
      } else if (language === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-US';
      }
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = () => {
    if (recognition && !isRecording) {
      setIsRecording(true);
      setPronunciationFeedback(null);
      recognition.start();
    }
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setIsFlipped(false);
      setShowTranslation(false);
      setPronunciationFeedback(null);
      setSessionStats(prev => ({
        ...prev,
        wordsStudied: prev.wordsStudied + 1
      }));

      // Mark word as completed
      const completedLessons = [...userProgress.completedLessons];
      if (!completedLessons.includes(currentWord.id)) {
        completedLessons.push(currentWord.id);
        onUpdateProgress({
          completedLessons,
          stats: {
            ...userProgress.stats,
            wordsLearned: completedLessons.length
          }
        });
        onAddXP(5);
      }
    } else {
      // End of session
      onAddXP(25); // Bonus XP for completing session
      alert(`Great job! You've completed this learning session.\nWords studied: ${sessionStats.wordsStudied + 1}\nPronunciation accuracy: ${sessionStats.totalAttempts > 0 ? Math.round((sessionStats.correctPronunciations / sessionStats.totalAttempts) * 100) : 0}%`);
      onBackToLibrary();
    }
  };

  const previousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setIsFlipped(false);
      setShowTranslation(false);
      setPronunciationFeedback(null);
    }
  };

  if (!currentWord) {
    return <div>No words available for this language.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBackToLibrary}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Library</span>
        </button>
        
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-2">
            Word {currentWordIndex + 1} of {words.length}
          </div>
          <div className="w-64 bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Accuracy: {sessionStats.totalAttempts > 0 ? Math.round((sessionStats.correctPronunciations / sessionStats.totalAttempts) * 100) : 0}%
          </div>
        </div>
      </div>

      {/* Main Learning Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-gray-800 mb-4">
            {isFlipped || showTranslation ? currentWord.translation : currentWord.word}
          </div>
          
          {currentWord.pronunciation && !isFlipped && !showTranslation && (
            <div className="text-xl text-gray-500 italic mb-4">
              /{currentWord.pronunciation}/
            </div>
          )}
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => speakWord(currentWord.word)}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 p-4 rounded-full transition-colors"
            >
              <Volume2 className="h-6 w-6" />
            </button>
            
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full transition-colors"
            >
              {showTranslation ? 'Hide' : 'Show'} Translation
            </button>
            
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-4 rounded-full transition-colors"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Pronunciation Practice */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Pronunciation Practice
          </h3>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              <Mic className="h-5 w-5" />
              <span>{isRecording ? 'Recording...' : 'Start Recording'}</span>
            </button>
          </div>

          {pronunciationFeedback && (
            <div className="mt-4 text-center">
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                pronunciationFeedback.accuracy >= 70 ? 'bg-green-100 text-green-800' : 
                pronunciationFeedback.accuracy >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                'bg-red-100 text-red-800'
              }`}>
                {pronunciationFeedback.accuracy >= 70 ? 
                  <CheckCircle className="h-5 w-5" /> : 
                  <XCircle className="h-5 w-5" />
                }
                <span>{pronunciationFeedback.feedback}</span>
                <span className="font-bold">{pronunciationFeedback.accuracy}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={previousWord}
            disabled={currentWordIndex === 0}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-600 capitalize">
              {currentWord.category} • {currentWord.difficulty}
            </span>
          </div>

          <button
            onClick={nextWord}
            className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
          >
            {currentWordIndex === words.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>

      {/* Session Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Session Progress</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-indigo-600">{sessionStats.wordsStudied}</div>
            <div className="text-sm text-gray-600">Words Studied</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{sessionStats.correctPronunciations}</div>
            <div className="text-sm text-gray-600">Correct Pronunciations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {sessionStats.totalAttempts > 0 ? Math.round((sessionStats.correctPronunciations / sessionStats.totalAttempts) * 100) : 0}%
            </div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningMode;