import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

function Feed({ posts, setPosts, user }) {
  const [loading, setLoading] = useState(false);

  const handleRating = async (postId, rating) => {
    if (!user) {
      alert("Please log in to rate posts");
      return;
    }

    try {
      setLoading(true);
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

      // Refresh posts after rating
      const postsResponse = await fetch("http://localhost:5000/posts");
      const postsData = await postsResponse.json();
      setPosts(postsData);

    } catch (error) {
      console.error("Error submitting rating:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="container-responsive py-8">
        <Card className="max-w-2xl mx-auto text-center p-12">
          <CardContent className="space-y-6">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-12 h-12 text-pink-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No posts yet</h3>
              <p className="text-gray-600 dark:text-gray-400">Be the first to share your style!</p>
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
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-pink-500" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Style Feed
          </h2>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Discover amazing outfits from our fashion community
        </p>
      </div>

      {/* Posts */}
      <div className="max-w-4xl mx-auto space-y-8">
        {posts.map((post) => (
          <Card key={post.postId} className="post-card">
            {/* Post Header */}
            <CardHeader className="border-b border-pink-200/30 dark:border-pink-800/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-14 h-14 avatar-online">
                      <AvatarImage src={post.userphoto} alt={post.displayName} />
                      <AvatarFallback>
                        {post.displayName?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                      {post.displayName || 'Fashion Lover'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      @{post.displayName?.toLowerCase().replace(/\s+/g, '') || 'user'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {post.averageRating > 0 && (
                    <div className="status-badge">
                      <Star className="w-3 h-3 mr-1" />
                      {post.averageRating.toFixed(1)}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Post Content */}
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-8 p-8">
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

                {/* Post Details */}
                <div className="space-y-6">
                  {/* Caption */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {post.caption}
                    </h4>
                    {post.description && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                  </div>

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

                  {/* Actions */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-pink-500">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">{post.likes || 0}</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">Comment</span>
                    </Button>
                    <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-green-500">
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Rating System */}
              <div className="p-8 bg-gradient-to-r from-pink-50/50 to-rose-50/50 dark:from-pink-900/10 dark:to-rose-900/10 border-t border-pink-200/30 dark:border-pink-800/30">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                    <h5 className="font-bold text-lg text-gray-800 dark:text-gray-200">Rate this outfit</h5>
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
                      disabled={loading}
                      className="rating-button disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
}

export default Feed;