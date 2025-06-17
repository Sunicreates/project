import React from 'react';
import { Home, Plus, Heart, Trophy, TrendingUp, X, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

function Sidebar({ mode, setMode, show }) {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', color: 'from-pink-500 to-rose-500' },
    { id: 'create', icon: Plus, label: 'Create Post', color: 'from-rose-500 to-purple-500' },
    { id: 'feed', icon: Heart, label: 'My Feed', color: 'from-purple-500 to-pink-500' },
    { id: 'rank', icon: Trophy, label: 'Rankings', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {show && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMode('home')}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 z-50
        glass-effect border-r border-pink-200/30 dark:border-pink-800/30
        transform transition-all duration-300 ease-in-out
        ${show ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Navigation</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMode('home')}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-3 flex-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = mode === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  className={`
                    w-full flex items-center space-x-4 px-4 py-4 rounded-2xl
                    transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                      ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-2 border-pink-300/30 dark:border-pink-600/30 shadow-lg' 
                      : 'hover:bg-white/50 dark:hover:bg-gray-700/50 border-2 border-transparent hover:border-pink-200/30 dark:hover:border-pink-800/30'
                    }
                  `}
                >
                  <div className={`
                    p-3 rounded-xl transition-all duration-300 shadow-md
                    ${isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-110` 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:scale-105'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`
                    font-semibold transition-colors duration-300
                    ${isActive 
                      ? 'text-gray-800 dark:text-gray-200' 
                      : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
                    }
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <div className="w-1 h-1 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Trending Section */}
          <Card className="mt-auto p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <TrendingUp className="w-4 h-4 text-pink-500" />
                <span>Trending Now</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['#SummerVibes', '#OOTD', '#Vintage', '#Chic'].map((tag) => (
                  <span
                    key={tag}
                    className="tag text-xs px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Join the conversation and discover what's hot in fashion!
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Sidebar;