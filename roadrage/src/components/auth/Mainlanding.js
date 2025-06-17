import React, { useState, useEffect } from 'react';
import { signInWithGoogle, db } from './firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Heart, Sparkles, Users, Camera, Star, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import ThemeToggle from '../../components/ThemeToggle';

export default function LandingPage({ setUser }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleclick = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      console.log("User after login:", user);
      setUser(user);

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          useremail: user.email ?? null,
          username: user.displayName ?? null,
          userphoto: user.photoURL ?? null,
          totalLikes: 0,
          totalPosts: 0
        });
        console.log("Signed in as ", user);
      } else {
        console.log("user already exists", user);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl float-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-300/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-10">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    FASHION CITY
                  </span>
                </div>
                
                <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
                    Express Your
                  </span>
                  <br />
                  <span className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                    Style
                    <div className="absolute -bottom-4 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-60"></div>
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Join our vibrant community of fashion enthusiasts. Share your outfits, 
                  discover trends, and connect with style-conscious women worldwide.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
                <Card className="text-center p-4 gentle-hover">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Camera className="w-6 h-6 text-pink-600" />
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Share Outfits</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Upload & showcase</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-4 gentle-hover">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-rose-600" />
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Get Feedback</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rate & be rated</p>
                  </CardContent>
                </Card>
                
                <Card className="text-center p-4 gentle-hover">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Connect</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Build community</p>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={handleclick} 
                  disabled={isLoading}
                  size="lg"
                  className="group"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Join with Google
                      <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleclick} 
                  disabled={isLoading}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center lg:justify-start gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">1.2K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-600">5.8K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Outfits Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">15K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Style Ratings</div>
                </div>
              </div>
            </div>

            {/* Right Content - Preview */}
            <div className="relative">
              <Card className="p-8 card-hover">
                <CardContent className="p-0">
                  <img
                    src="/Screenshot 2025-06-04 214850.png"
                    alt="Fashion City Preview"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg pulse-glow">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg pulse-glow" style={{ animationDelay: '1s' }}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute top-1/2 -left-6 w-10 h-10 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg pulse-glow" style={{ animationDelay: '2s' }}>
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-pink-100/50 dark:fill-gray-800/50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </div>
  );
}