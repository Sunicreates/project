import React, { useState, useEffect } from "react";
import { Trophy, Star, Crown, Medal, Award, TrendingUp, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

function AApp({ user }) {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        console.log("Current user:", user);

        const topUsersResponse = await fetch("http://localhost:5000/daily-top");
        console.log("Top users response status:", topUsersResponse.status);
        
        if (!topUsersResponse.ok) {
          throw new Error(`HTTP error! status: ${topUsersResponse.status}`);
        }
        
        const topUsersData = await topUsersResponse.json();
        console.log("Top users data:", topUsersData);
        
        setTopUsers(topUsersData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Crown className="w-8 h-8 text-yellow-500" />;
      case 1: return <Medal className="w-8 h-8 text-gray-400" />;
      case 2: return <Award className="w-8 h-8 text-amber-600" />;
      default: return <Trophy className="w-6 h-6 text-pink-500" />;
    }
  };

  const getRankBadge = (index) => {
    const badges = [
      "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg",
      "bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg", 
      "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg",
    ];
    return badges[index] || "bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg";
  };

  const getRankTitle = (index) => {
    const titles = [
      'Style Queen 👑',
      'Trendsetter ⭐',
      'Fashion Star ✨',
    ];
    return titles[index] || 'Style Enthusiast';
  };

  if (loading) {
    return (
      <div className="container-responsive py-8">
        <div className="text-center py-16">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading style rankings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-responsive py-8">
        <Card className="max-w-2xl mx-auto text-center p-12">
          <CardContent className="space-y-6">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">Oops!</h3>
              <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Style Champions
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Today's most loved fashion influencers and trendsetters
        </p>
      </div>

      {/* Live Badge */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">Live Rankings</span>
        </div>
      </div>
      
      {topUsers.length === 0 ? (
        <Card className="max-w-2xl mx-auto text-center p-16">
          <CardContent className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-12 h-12 text-pink-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No rankings yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Be the first to rate outfits and climb the leaderboard!</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {topUsers.map((user, index) => (
            <Card 
              key={`${user.displayName}-${index}`} 
              className={`
                user-card
                ${index < 3 ? 'ring-4 ring-yellow-200 dark:ring-yellow-800/50' : ''}
                ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : ''}
              `}
            >
              {/* Rank Badge */}
              <div className={`
                absolute top-6 left-6 w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl
                ${getRankBadge(index)}
              `}>
                {index + 1}
              </div>

              {/* Background decoration for top 3 */}
              {index < 3 && (
                <div className="absolute top-4 right-4 opacity-20">
                  {getRankIcon(index)}
                </div>
              )}

              <CardContent className="flex items-center ml-20 p-6">
                {/* Rank Icon */}
                <div className="mr-6">
                  {getRankIcon(index)}
                </div>
                
                {/* User Avatar */}
                <div className="relative mr-6">
                  <Avatar className="w-20 h-20 ring-4 ring-white dark:ring-gray-700 shadow-xl">
                    <AvatarImage src={user.photoURL} alt={user.displayName} />
                    <AvatarFallback className="text-xl font-bold">
                      {user.displayName?.charAt(0) || '👤'}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                </div>
                
                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
                      {user.displayName || 'Anonymous Fashionista'}
                    </h3>
                    {index < 3 && (
                      <div className="px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full border border-pink-200 dark:border-pink-800">
                        <span className="text-sm font-bold text-pink-700 dark:text-pink-300">
                          {getRankTitle(index)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-bold text-lg text-pink-600 dark:text-pink-400">
                        {user.averageDailyRating?.toFixed(1) || '0.0'}
                      </span>
                      <span className="font-medium">avg rating</span>
                    </div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="font-medium">{user.ratingsCount || 0} ratings today</span>
                  </div>
                </div>

                {/* Rating Display */}
                <div className="text-right">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    {user.averageDailyRating?.toFixed(1) || '0.0'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    out of 10
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div className="text-center pt-8">
        <Card className="max-w-md mx-auto p-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
          <CardContent className="flex items-center justify-center gap-2 p-0">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Rankings update in real-time based on daily ratings
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AApp;