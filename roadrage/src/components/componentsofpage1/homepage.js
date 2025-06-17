import React, { useState, useEffect } from 'react';
import { Heart, Star, TrendingUp, Users, Sparkles, Crown, Award } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

function Homepage({ user }) {
  const [randomPosts, setRandomPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const posts = await response.json();
        
        const shuffled = [...posts].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setRandomPosts(selected);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random posts:", error);
        setLoading(false);
      }
    };

    fetchRandomPosts();
    const intervalId = setInterval(fetchRandomPosts, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleRating = async (postId, rating) => {
    if (!user) {
      alert("Please log in to rate posts");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId,
          userId: user.uid,
          rating,
          displayName: user?.displayName || user?.username,
          email: user.email 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit rating");
      }

      const postsResponse = await fetch("http://localhost:5000/posts");
      const postsData = await postsResponse.json();
      const shuffled = [...postsData].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 5);
      setRandomPosts(selected);

    } catch (error) {
      console.error("Error submitting rating:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="container-responsive py-8">
        <div className="text-center py-16">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading amazing styles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive py-8 space-y-12">
      {/* Welcome Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Welcome to Fashion City
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Discover trending styles, connect with fashion lovers, and share your unique looks with our vibrant community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center p-8 card-hover">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-full flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-pink-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">1.2K+</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Active Users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center p-8 card-hover">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">5.8K+</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Outfits Shared</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="text-center p-8 card-hover">
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">15K+</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Style Ratings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Posts */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Trending Styles
            </h2>
          </div>
          <div className="flex items-center gap-2 text-pink-600 bg-pink-100 dark:bg-pink-900/30 px-4 py-2 rounded-full">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-semibold">Hot Right Now</span>
          </div>
        </div>

        {randomPosts.length === 0 ? (
          <Card className="text-center p-16">
            <CardContent className="space-y-6">
              <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-12 h-12 text-pink-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No posts yet</h3>
                <p className="text-gray-600 dark:text-gray-400">Be the first to share your amazing style!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {randomPosts.map((post) => (
              <Card key={post.postId} className="post-card">
                {/* Post Header */}
                <CardHeader className="border-b border-pink-200/30 dark:border-pink-800/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-14 h-14 avatar-online">
                        <AvatarImage src={post.userphoto} alt={post.displayName} />
                        <AvatarFallback>
                          {post.displayName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                          {post.displayName || 'Fashion Lover'}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Style Enthusiast
                        </p>
                      </div>
                    </div>
                    {post.averageRating > 0 && (
                      <div className="status-badge">
                        <Star className="w-3 h-3 mr-1" />
                        {post.averageRating.toFixed(1)}
                      </div>
                    )}
                  </div>
                </CardHeader>

                {/* Post Content */}
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    {/* Caption and Description */}
                    <div className="space-y-6">
                      <Card className="p-6 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                        <CardContent className="p-0">
                          <h4 className="text-2xl font-bold text-pink-700 dark:text-pink-300 mb-3">
                            {post.caption}
                          </h4>
                          {post.description && (
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.split(',').map((tag, i) => (
                            <span key={i} className="tag">
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Image */}
                    <div className="relative group">
                      <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-inner">
                        {post.img ? (
                          <img
                            src={post.img}
                            alt={post.caption}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating System */}
                  <div className="p-8 bg-gradient-to-r from-pink-50/50 to-rose-50/50 dark:from-pink-900/10 dark:to-rose-900/10 border-t border-pink-200/30 dark:border-pink-800/30">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-pink-500" />
                        <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200">Rate this style</h5>
                      </div>
                      {post.ratings && post.ratings.length > 0 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                          {post.ratings.length} rating{post.ratings.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-center space-x-3 flex-wrap gap-2">
                      {[...Array(10)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleRating(post.postId, i + 1)}
                          className="rating-button"
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;