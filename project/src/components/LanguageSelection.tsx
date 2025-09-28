import React from 'react';
import { ChevronRight, Globe, Star } from 'lucide-react';

interface LanguageSelectionProps {
  selectedLanguage: string;
  onLanguageSelect: (language: string) => void;
  onStartLearning: () => void;
}

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    gradient: 'from-blue-500 to-blue-600',
    description: 'Master the global language of communication'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    gradient: 'from-orange-500 to-red-500',
    description: 'Learn the most spoken language in India'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    gradient: 'from-green-500 to-emerald-600',
    description: 'Discover one of the oldest languages in the world'
  }
];

const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  selectedLanguage,
  onLanguageSelect,
  onStartLearning
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Globe className="h-16 w-16 text-indigo-600 mr-4" />
          <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-2">
              Welcome to LinguaLearn
            </h1>
            <p className="text-xl text-gray-600">
              Master new languages with interactive lessons and AI-powered practice
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-8">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            <span>Interactive Learning</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            <span>Speech Recognition</span>
          </div>
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            <span>Gamified Progress</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Choose Your Language
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {languages.map((language) => (
            <div
              key={language.code}
              className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                selectedLanguage === language.code
                  ? 'ring-4 ring-indigo-400 scale-105'
                  : 'hover:shadow-xl'
              }`}
              onClick={() => onLanguageSelect(language.code)}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-indigo-200">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${language.gradient} flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {language.flag}
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-2">
                  {language.name}
                </h3>
                <p className="text-lg text-center text-gray-600 mb-3">
                  {language.nativeName}
                </p>
                <p className="text-sm text-center text-gray-500 mb-6">
                  {language.description}
                </p>
                
                {selectedLanguage === language.code && (
                  <div className="flex items-center justify-center">
                    <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                      Selected
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLanguage && (
        <div className="text-center">
          <button
            onClick={onStartLearning}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center mx-auto"
          >
            Start Learning
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelection;