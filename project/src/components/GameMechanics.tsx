import React from 'react';
import { Star, Flame, Trophy, Zap } from 'lucide-react';
import { UserProgress } from '../App';

interface GameMechanicsProps {
  userProgress: UserProgress;
}

const GameMechanics: React.FC<GameMechanicsProps> = ({ userProgress }) => {
  const getNextLevelXP = (level: number) => level * 100;
  const currentLevelXP = (userProgress.level - 1) * 100;
  const nextLevelXP = getNextLevelXP(userProgress.level);
  const progressToNextLevel = ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="flex items-center space-x-6">
      {/* Level and XP */}
      <div className="flex items-center space-x-2">
        <Star className="h-6 w-6 text-yellow-500" />
        <div className="text-sm">
          <div className="font-bold text-indigo-600">Level {userProgress.level}</div>
          <div className="text-xs text-gray-600">{userProgress.xp} XP</div>
        </div>
        <div className="w-16 bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${Math.min(progressToNextLevel, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center space-x-2">
        <Flame className={`h-6 w-6 ${userProgress.streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
        <div className="text-sm">
          <div className="font-bold text-orange-600">{userProgress.streak}</div>
          <div className="text-xs text-gray-600">day streak</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Trophy className="h-4 w-4 text-green-500" />
          <span className="text-gray-600">{userProgress.stats.wordsLearned}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap className="h-4 w-4 text-purple-500" />
          <span className="text-gray-600">{userProgress.stats.quizzesCompleted}</span>
        </div>
      </div>
    </div>
  );
};

export default GameMechanics;