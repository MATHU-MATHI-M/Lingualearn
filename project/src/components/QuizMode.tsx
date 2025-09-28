import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trophy, Clock, Zap } from 'lucide-react';
import { getWordsForLanguage, Word, categories } from '../data/languages';
import { UserProgress } from '../App';

interface QuizModeProps {
  language: string;
  userProgress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
  onAddXP: (amount: number) => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  word: Word;
  type: 'translation' | 'audio' | 'multiple_choice';
}

const QuizMode: React.FC<QuizModeProps> = ({
  language,
  userProgress,
  onUpdateProgress,
  onAddXP
}) => {
  const [words] = useState<Word[]>(getWordsForLanguage(language));
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quizType, setQuizType] = useState<'quick' | 'timed' | 'challenge'>('quick');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted) {
      handleAnswer(-1); // Time up
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, showResult]);

  const generateQuestions = (numQuestions: number = 10): QuizQuestion[] => {
    let availableWords = [...words];
    
    if (selectedCategory !== 'all') {
      availableWords = words.filter(word => word.category === selectedCategory);
    }

    const questions: QuizQuestion[] = [];
    const questionTypes: QuizQuestion['type'][] = ['translation', 'audio', 'multiple_choice'];

    for (let i = 0; i < Math.min(numQuestions, availableWords.length); i++) {
      const word = availableWords[Math.floor(Math.random() * availableWords.length)];
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      // Remove word from available pool
      availableWords = availableWords.filter(w => w.id !== word.id);

      let question: QuizQuestion;
      
      switch (questionType) {
        case 'translation':
          question = createTranslationQuestion(word, availableWords);
          break;
        case 'audio':
          question = createAudioQuestion(word, availableWords);
          break;
        case 'multiple_choice':
          question = createMultipleChoiceQuestion(word, availableWords);
          break;
        default:
          question = createTranslationQuestion(word, availableWords);
      }
      
      questions.push(question);
    }

    return questions;
  };

  const createTranslationQuestion = (word: Word, otherWords: Word[]): QuizQuestion => {
    const wrongOptions = otherWords
      .filter(w => w.translation !== word.translation)
      .slice(0, 3)
      .map(w => w.translation);
    
    const options = [word.translation, ...wrongOptions].sort(() => Math.random() - 0.5);
    const correctAnswer = options.indexOf(word.translation);

    return {
      id: `translation_${word.id}`,
      question: `What does "${word.word}" mean?`,
      options,
      correctAnswer,
      word,
      type: 'translation'
    };
  };

  const createAudioQuestion = (word: Word, otherWords: Word[]): QuizQuestion => {
    const wrongOptions = otherWords
      .filter(w => w.word !== word.word)
      .slice(0, 3)
      .map(w => w.word);
    
    const options = [word.word, ...wrongOptions].sort(() => Math.random() - 0.5);
    const correctAnswer = options.indexOf(word.word);

    return {
      id: `audio_${word.id}`,
      question: `Which word sounds like this? (Click to play)`,
      options,
      correctAnswer,
      word,
      type: 'audio'
    };
  };

  const createMultipleChoiceQuestion = (word: Word, otherWords: Word[]): QuizQuestion => {
    const wrongOptions = otherWords
      .filter(w => w.word !== word.word)
      .slice(0, 3)
      .map(w => w.word);
    
    const options = [word.word, ...wrongOptions].sort(() => Math.random() - 0.5);
    const correctAnswer = options.indexOf(word.word);

    return {
      id: `choice_${word.id}`,
      question: `Which word means "${word.translation}"?`,
      options,
      correctAnswer,
      word,
      type: 'multiple_choice'
    };
  };

  const startQuiz = () => {
    const questions = generateQuestions(quizType === 'quick' ? 5 : quizType === 'timed' ? 10 : 15);
    setQuizQuestions(questions);
    setCurrentQuestion(questions[0]);
    setQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStarted(true);
    setTimeLeft(quizType === 'timed' ? 30 : quizType === 'challenge' ? 15 : 60);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === currentQuestion?.correctAnswer) {
      setScore(score + 1);
      const xpAmount = quizType === 'challenge' ? 20 : quizType === 'timed' ? 15 : 10;
      onAddXP(xpAmount);
    }

    setTimeout(() => {
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    if (questionIndex < quizQuestions.length - 1) {
      const nextIndex = questionIndex + 1;
      setCurrentQuestion(quizQuestions[nextIndex]);
      setQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(quizType === 'timed' ? 30 : quizType === 'challenge' ? 15 : 60);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizStarted(false);
    const accuracy = Math.round((score / quizQuestions.length) * 100);
    
    // Update user progress
    onUpdateProgress({
      stats: {
        ...userProgress.stats,
        quizzesCompleted: userProgress.stats.quizzesCompleted + 1,
        pronunciationAccuracy: Math.round(
          (userProgress.stats.pronunciationAccuracy + accuracy) / 2
        )
      }
    });

    // Bonus XP for high scores
    if (accuracy >= 80) {
      onAddXP(50);
    } else if (accuracy >= 60) {
      onAddXP(25);
    }
  };

  const playWordAudio = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      // Enhanced Tamil speech support
      if (language === 'ta') {
        utterance.lang = 'ta-IN';
        const voices = speechSynthesis.getVoices();
        const tamilVoice = voices.find(voice => 
          voice.lang.includes('ta') || 
          voice.name.toLowerCase().includes('tamil') ||
          voice.lang.includes('hi-IN')
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

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Practice Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Test your knowledge and improve your language skills
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Choose Quiz Type</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  type: 'quick' as const,
                  name: 'Quick Quiz',
                  description: '5 questions, relaxed timing',
                  icon: Zap,
                  color: 'from-green-500 to-green-600'
                },
                {
                  type: 'timed' as const,
                  name: 'Timed Challenge',
                  description: '10 questions, 30s each',
                  icon: Clock,
                  color: 'from-yellow-500 to-orange-500'
                },
                {
                  type: 'challenge' as const,
                  name: 'Expert Challenge',
                  description: '15 questions, 15s each',
                  icon: Trophy,
                  color: 'from-red-500 to-purple-600'
                }
              ].map((quiz) => (
                <button
                  key={quiz.type}
                  onClick={() => setQuizType(quiz.type)}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    quizType === quiz.type
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${quiz.color} flex items-center justify-center mb-4 mx-auto`}>
                    <quiz.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{quiz.name}</h3>
                  <p className="text-gray-600">{quiz.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Select Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedCategory === 'all'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="text-2xl mb-2">📚</div>
                <div className="font-semibold">All</div>
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedCategory === category.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-semibold text-sm">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
          <div className="text-6xl font-bold text-indigo-600 mb-2">
            {Math.round((score / quizQuestions.length) * 100)}%
          </div>
          <p className="text-xl text-gray-600 mb-4">
            You scored {score} out of {quizQuestions.length} questions correctly!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-600">{quizQuestions.length - score}</div>
              <div className="text-sm text-gray-600">Incorrect Answers</div>
            </div>
          </div>

          <button
            onClick={() => {
              setQuizStarted(false);
              setCurrentQuestion(null);
              setQuizQuestions([]);
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Question {questionIndex + 1} of {quizQuestions.length}
          </div>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-lg font-bold text-indigo-600">
            Score: {score}/{quizQuestions.length}
          </div>
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
            timeLeft <= 10 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <Clock className="h-4 w-4" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {currentQuestion.question}
          </h2>

          {currentQuestion.type === 'audio' && (
            <button
              onClick={() => playWordAudio(currentQuestion.word.word)}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-6 py-3 rounded-full mb-6 transition-colors"
            >
              🔊 Play Audio
            </button>
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ";
            
            if (showResult) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else if (selectedAnswer === index) {
              buttonClass += "border-indigo-500 bg-indigo-50 text-indigo-700";
            } else {
              buttonClass += "border-gray-300 hover:border-indigo-300";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={buttonClass}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                  {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-8 text-center">
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full text-lg font-semibold ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {selectedAnswer === currentQuestion.correctAnswer ? (
                <>
                  <CheckCircle className="h-6 w-6" />
                  <span>Correct! Well done!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6" />
                  <span>
                    {selectedAnswer === -1 ? 'Time\'s up!' : 'Not quite right.'} The answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMode;