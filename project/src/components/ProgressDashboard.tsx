import React from 'react';
import { Trophy, Flame, Star, BookOpen, Target, TrendingUp, Calendar } from 'lucide-react';
import { UserProgress } from '../App';

interface ProgressDashboardProps {
  userProgress: UserProgress;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userProgress }) => {
  const achievements = [
    {
      id: 'first_word',
      name: 'First Steps',
      description: 'Learn your first word',
      icon: '🎯',
      unlocked: userProgress.stats.wordsLearned >= 1,
      requirement: 1
    },
    {
      id: 'word_master_10',
      name: 'Word Explorer',
      description: 'Learn 10 words',
      icon: '📚',
      unlocked: userProgress.stats.wordsLearned >= 10,
      requirement: 10
    },
    {
      id: 'quiz_master',
      name: 'Quiz Champion',
      description: 'Complete 5 quizzes',
      icon: '🏆',
      unlocked: userProgress.stats.quizzesCompleted >= 5,
      requirement: 5
    },
    {
      id: 'streak_7',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: userProgress.streak >= 7,
      requirement: 7
    },
    {
      id: 'level_5',
      name: 'Rising Star',
      description: 'Reach Level 5',
      icon: '⭐',
      unlocked: userProgress.level >= 5,
      requirement: 5
    },
    {
      id: 'level_10',
      name: 'Language Expert',
      description: 'Reach Level 10',
      icon: '🌟',
      unlocked: userProgress.level >= 10,
      requirement: 10
    },
    {
      id: 'pronunciation_pro',
      name: 'Pronunciation Pro',
      description: 'Achieve 90% pronunciation accuracy',
      icon: '🎤',
      unlocked: userProgress.stats.pronunciationAccuracy >= 90,
      requirement: 90
    },
    {
      id: 'word_master_50',
      name: 'Vocabulary Master',
      description: 'Learn 50 words',
      icon: '📖',
      unlocked: userProgress.stats.wordsLearned >= 50,
      requirement: 50
    }
  ];

  const getNextLevelXP = (level: number) => level * 100;
  const currentLevelXP = (userProgress.level - 1) * 100;
  const nextLevelXP = getNextLevelXP(userProgress.level);
  const progressToNextLevel = ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const getDaysThisMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  };

  const getStudyCalendar = () => {
    const daysInMonth = getDaysThisMonth();
    const calendar = [];
    const today = new Date().getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isStudied = Math.random() > 0.3; // Simulate study days
      const isToday = day === today;
      calendar.push({ day, isStudied, isToday });
    }
    
    return calendar;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Progress
        </h1>
        <p className="text-lg text-gray-600">
          Track your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Star className="h-8 w-8" />
            <span className="text-2xl font-bold">Level {userProgress.level}</span>
          </div>
          <div className="mb-2">
            <div className="text-sm opacity-90">XP: {userProgress.xp}/{nextLevelXP}</div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Flame className="h-8 w-8" />
            <span className="text-2xl font-bold">{userProgress.streak}</span>
          </div>
          <div className="text-sm opacity-90">Day Streak</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="h-8 w-8" />
            <span className="text-2xl font-bold">{userProgress.stats.wordsLearned}</span>
          </div>
          <div className="text-sm opacity-90">Words Learned</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Target className="h-8 w-8" />
            <span className="text-2xl font-bold">{userProgress.stats.quizzesCompleted}</span>
          </div>
          <div className="text-sm opacity-90">Quizzes Completed</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-indigo-600" />
            Performance Overview
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Pronunciation Accuracy</span>
                <span className="font-bold text-indigo-600">{userProgress.stats.pronunciationAccuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-indigo-600 rounded-full h-3 transition-all duration-300"
                  style={{ width: `${userProgress.stats.pronunciationAccuracy}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Vocabulary Progress</span>
                <span className="font-bold text-green-600">{Math.min((userProgress.stats.wordsLearned / 100) * 100, 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 rounded-full h-3 transition-all duration-300"
                  style={{ width: `${Math.min((userProgress.stats.wordsLearned / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Quiz Performance</span>
                <span className="font-bold text-purple-600">{Math.min(userProgress.stats.quizzesCompleted * 10, 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-600 rounded-full h-3 transition-all duration-300"
                  style={{ width: `${Math.min(userProgress.stats.quizzesCompleted * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Calendar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-indigo-600" />
            Study Calendar
          </h3>
          
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {getStudyCalendar().map(({ day, isStudied, isToday }) => (
              <div
                key={day}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                  isToday
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                    : isStudied
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-100 rounded"></div>
                <span className="text-gray-600">Studied</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-indigo-600 rounded"></div>
                <span className="text-gray-600">Today</span>
              </div>
            </div>
            <span className="text-gray-600">
              {getStudyCalendar().filter(d => d.isStudied).length} days this month
            </span>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-indigo-600" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${
                  achievement.unlocked ? 'grayscale-0' : 'grayscale opacity-50'
                }`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-bold mb-1 ${
                  achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </h4>
                <p className={`text-sm mb-2 ${
                  achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                
                {achievement.unlocked ? (
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                    UNLOCKED
                  </div>
                ) : (
                  <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                    {achievement.requirement} required
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;