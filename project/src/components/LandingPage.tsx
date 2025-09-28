import React from 'react'
import { BookOpen, Target, Zap, Award, Mic, Volume2, Trophy } from 'lucide-react'

const LandingPage: React.FC<{ onSignUp: () => void; onSignIn: () => void }> = ({ onSignUp, onSignIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">LinguaLearn</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Languages with
            <span className="text-indigo-600"> AI-Powered Learning</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the future of language learning with our interactive platform.
            Learn vocabulary, improve pronunciation, and track your progress with gamified features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onSignUp}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Start Learning Today
            </button>
            <button
              onClick={onSignIn}
              className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-50 transition-colors"
            >
              Already have an account? Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose LinguaLearn?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mic className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice Recognition</h3>
              <p className="text-gray-600">
                Practice pronunciation with advanced speech recognition technology.
                Get instant feedback on your speaking skills.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Quizzes</h3>
              <p className="text-gray-600">
                Test your knowledge with engaging quizzes and instant results.
                Learn from mistakes and improve continuously.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gamification</h3>
              <p className="text-gray-600">
                Earn XP, unlock achievements, and maintain learning streaks.
                Make language learning fun and addictive.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning</h3>
              <p className="text-gray-600">
                Adaptive learning paths based on your progress and performance.
                Focus on areas that need improvement.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Volume2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Audio Support</h3>
              <p className="text-gray-600">
                Listen to native pronunciations and practice with audio exercises.
                Perfect your accent with guided audio lessons.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Detailed statistics and insights into your learning journey.
                Set goals and monitor your improvement over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of learners already mastering new languages with LinguaLearn.
          </p>
          <button
            onClick={onSignUp}
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            Get Started Free
          </button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage