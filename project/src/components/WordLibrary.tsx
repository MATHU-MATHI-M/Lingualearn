import React, { useState } from 'react';
import { Play, BookOpen, ChevronRight, Filter, Search } from 'lucide-react';
import { categories, getWordsByCategory, Word } from '../data/languages';
import { UserProgress } from '../App';

interface WordLibraryProps {
  language: string;
  onStartLearning: () => void;
  userProgress: UserProgress;
}

const WordLibrary: React.FC<WordLibraryProps> = ({
  language,
  onStartLearning,
  userProgress
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const getFilteredWords = (): Word[] => {
    let words: Word[] = [];
    
    if (selectedCategory === 'all') {
      categories.forEach(category => {
        words.push(...getWordsByCategory(language, category.id));
      });
    } else {
      words = getWordsByCategory(language, selectedCategory);
    }

    if (searchTerm) {
      words = words.filter(word => 
        word.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.translation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDifficulty !== 'all') {
      words = words.filter(word => word.difficulty === filterDifficulty);
    }

    return words;
  };

  const speakWord = (word: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      // Enhanced language support for Tamil
      if (lang === 'ta') {
        utterance.lang = 'ta-IN';
        // Try to find a Tamil voice or use Hindi as fallback
        const voices = speechSynthesis.getVoices();
        const tamilVoice = voices.find(voice => 
          voice.lang.includes('ta') || 
          voice.name.toLowerCase().includes('tamil') ||
          voice.lang.includes('hi-IN')
        );
        if (tamilVoice) {
          utterance.voice = tamilVoice;
        }
      } else if (lang === 'hi') {
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

  const getCategoryProgress = (categoryId: string): number => {
    const wordsInCategory = getWordsByCategory(language, categoryId);
    const completedWords = wordsInCategory.filter(word => 
      userProgress.completedLessons.includes(word.id)
    ).length;
    return Math.round((completedWords / wordsInCategory.length) * 100) || 0;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Word Library
        </h1>
        <p className="text-lg text-gray-600">
          Explore and practice vocabulary in your chosen language
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search words..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`p-4 rounded-2xl border-2 transition-all ${
            selectedCategory === 'all'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
              : 'border-gray-200 hover:border-indigo-300'
          }`}
        >
          <div className="text-2xl mb-2">📚</div>
          <div className="font-semibold">All</div>
        </button>
        
        {categories.map((category) => {
          const progress = getCategoryProgress(category.id);
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-2xl border-2 transition-all relative ${
                selectedCategory === category.id
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-semibold">{category.name}</div>
              {progress > 0 && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {progress}%
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Words Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredWords().map((word) => {
          const isCompleted = userProgress.completedLessons.includes(word.id);
          
          return (
            <div
              key={word.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    {word.word}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2">
                    {word.translation}
                  </p>
                  {word.pronunciation && (
                    <p className="text-sm text-gray-500 italic">
                      /{word.pronunciation}/
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  {isCompleted && (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      ✓ Learned
                    </div>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    word.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    word.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {word.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => speakWord(word.word, language)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>Listen</span>
                </button>
                
                <div className="text-sm text-gray-500 capitalize">
                  {word.category}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Learning Button */}
      <div className="text-center mt-12">
        <button
          onClick={onStartLearning}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center mx-auto"
        >
          <BookOpen className="mr-2 h-5 w-5" />
          Start Interactive Learning
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default WordLibrary;