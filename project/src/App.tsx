import { useState, useEffect } from 'react';
import { BookOpen, User } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import ProfileSettings from './components/ProfileSettings';
import LanguageSelection from './components/LanguageSelection';
import WordLibrary from './components/WordLibrary';
import LearningMode from './components/LearningMode';
import QuizMode from './components/QuizMode';
import ProgressDashboard from './components/ProgressDashboard';
import GameMechanics from './components/GameMechanics';

export interface UserProgress {
  currentLanguage: string;
  level: number;
  xp: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[];
  achievements: string[];
  stats: {
    wordsLearned: number;
    quizzesCompleted: number;
    pronunciationAccuracy: number;
    totalStudyTime: number;
  };
}

function App() {
  const { user, loading } = useAuth()
  const [authView, setAuthView] = useState<'landing' | 'signin' | 'signup'>('landing')
  const [currentView, setCurrentView] = useState<'home' | 'library' | 'learning' | 'quiz' | 'progress' | 'profile'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en'); // Default to English
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('languageLearningProgress');
    return saved ? JSON.parse(saved) : {
      currentLanguage: 'en',
      level: 1,
      xp: 0,
      streak: 0,
      lastActiveDate: new Date().toDateString(),
      completedLessons: [],
      achievements: [],
      stats: {
        wordsLearned: 0,
        quizzesCompleted: 0,
        pronunciationAccuracy: 0,
        totalStudyTime: 0
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('languageLearningProgress', JSON.stringify(userProgress));
    
    // Load available voices for better Tamil support
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => ({ name: v.name, lang: v.lang })));
      };
      
      if (speechSynthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
      }
    }
  }, [userProgress]);

  useEffect(() => {
    // Update streak logic
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (userProgress.lastActiveDate !== today) {
      if (userProgress.lastActiveDate === yesterday) {
        // Continue streak
        setUserProgress(prev => ({
          ...prev,
          lastActiveDate: today
        }));
      } else if (userProgress.lastActiveDate !== today) {
        // Reset streak if more than 1 day gap
        setUserProgress(prev => ({
          ...prev,
          streak: 0,
          lastActiveDate: today
        }));
      }
    }
  }, [userProgress.lastActiveDate]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({ ...prev, ...updates }));
  };

  const addXP = (amount: number) => {
    const newXP = userProgress.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    
    setUserProgress(prev => ({
      ...prev,
      xp: newXP,
      level: newLevel
    }));

    // Check for level up achievements
    if (newLevel > userProgress.level) {
      const achievements = [...userProgress.achievements];
      if (newLevel === 5 && !achievements.includes('level_5')) {
        achievements.push('level_5');
      }
      if (newLevel === 10 && !achievements.includes('level_10')) {
        achievements.push('level_10');
      }
      setUserProgress(prev => ({
        ...prev,
        achievements
      }));
    }
  };

  const Navigation = () => {
    const { user } = useAuth()
    const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'

    return (
      <nav className="bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">LinguaLearn</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() => setCurrentView('home')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === 'home' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentView('library')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === 'library' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Library
              </button>
              <button
                onClick={() => setCurrentView('quiz')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === 'quiz' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Practice
              </button>
              <button
                onClick={() => setCurrentView('progress')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentView === 'progress' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Progress
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <GameMechanics userProgress={userProgress} />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Welcome, {username}</span>
                <button
                  onClick={() => setCurrentView('profile')}
                  className={`p-2 rounded-lg transition-all ${
                    currentView === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-600'
                  }`}
                  title="Profile Settings"
                >
                  <User className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        {authView === 'landing' && (
          <LandingPage
            onSignUp={() => setAuthView('signup')}
            onSignIn={() => setAuthView('signin')}
          />
        )}
        {(authView === 'signin' || authView === 'signup') && (
          <AuthForm
            mode={authView}
            onSwitchMode={() => setAuthView(authView === 'signin' ? 'signup' : 'signin')}
          />
        )}
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'home' && (
          <LanguageSelection
            selectedLanguage={selectedLanguage}
            onLanguageSelect={(lang) => {
              setSelectedLanguage(lang);
              setUserProgress(prev => ({ ...prev, currentLanguage: lang }));
            }}
            onStartLearning={() => setCurrentView('library')}
          />
        )}

        {currentView === 'library' && (
          selectedLanguage ? (
            <WordLibrary
              language={selectedLanguage}
              onStartLearning={() => setCurrentView('learning')}
              userProgress={userProgress}
            />
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Language First</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Please choose a language from the home page to access the word library.
                </p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                >
                  Choose Language
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'learning' && selectedLanguage && (
          <LearningMode
            language={selectedLanguage}
            userProgress={userProgress}
            onUpdateProgress={updateProgress}
            onAddXP={addXP}
            onBackToLibrary={() => setCurrentView('library')}
          />
        )}

        {currentView === 'quiz' && (
          selectedLanguage ? (
            <QuizMode
              language={selectedLanguage}
              userProgress={userProgress}
              onUpdateProgress={updateProgress}
              onAddXP={addXP}
            />
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Select a Language First</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Please choose a language from the home page to start practicing.
                </p>
                <button
                  onClick={() => setCurrentView('home')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
                >
                  Choose Language
                </button>
              </div>
            </div>
          )
        )}

        {currentView === 'progress' && (
          <ProgressDashboard userProgress={userProgress} />
        )}

        {currentView === 'profile' && (
          <ProfileSettings />
        )}
      </main>
    </div>
  );
}

export default App;