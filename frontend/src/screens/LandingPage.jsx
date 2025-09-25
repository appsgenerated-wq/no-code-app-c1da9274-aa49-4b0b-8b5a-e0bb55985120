import React, { useState } from 'react';
import { BookOpenIcon, UsersIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (isLogin) {
      await onLogin(email, password);
    } else {
      await onSignup(name, email, password);
    }
    setLoading(false);
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const success = await onLogin('admin@manifest.build', 'admin');
    if (!success) {
      alert('Demo login failed. Please ensure the default admin user exists.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">FlavorFusion</span>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
                <button onClick={handleDemoLogin} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    {loading ? 'Logging in...' : 'Try Demo'}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-50" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-gray-900">Discover & Share</span>
                  <span className="block text-blue-600">Amazing Recipes</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-gray-700 sm:max-w-3xl">
                  Join a vibrant community of food lovers. Create your personal cookbook, find inspiration, and bring delicious meals to your table.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="w-full sm:w-auto md:w-96 bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {!isLogin && (
                         <div>
                          <label htmlFor="name" className="sr-only">Name</label>
                          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Your Name" required />
                        </div>
                      )}
                      <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Email address" required />
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Password" required />
                      </div>
                      <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400">
                        {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                        <ArrowRightIcon className="ml-2 h-5 w-5"/>
                      </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                      {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                      <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:text-blue-500">
                        {isLogin ? 'Sign up' : 'Log in'}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-gray-50 pt-16 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Everything you need to be a better chef</h2>
              <p className="mt-4 text-lg text-gray-600">FlavorFusion is more than just recipes. It's your personal kitchen assistant.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex-shrink-0">
                  <BookOpenIcon className="h-8 w-8 text-white bg-blue-600 rounded-lg p-1" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Your Digital Cookbook</h3>
                <p className="mt-2 text-gray-600">Save your favorite recipes and create your own. Access them anywhere, anytime.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex-shrink-0">
                  <UsersIcon className="h-8 w-8 text-white bg-blue-600 rounded-lg p-1" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">Community Driven</h3>
                <p className="mt-2 text-gray-600">Discover recipes from a global community of chefs and home cooks.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex-shrink-0">
                  <SparklesIcon className="h-8 w-8 text-white bg-blue-600 rounded-lg p-1" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">AI-Powered Assistance</h3>
                <p className="mt-2 text-gray-600">Get suggestions, ingredient substitutions, and cooking tips instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 FlavorFusion. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-2">Powered by Manifest</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
