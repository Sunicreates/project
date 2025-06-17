import React, { useState } from 'react';
import { Camera, Upload, Tag, Type, FileText, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

function DressForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    img: null,
    caption: '',
    description: '',
    tags: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, img: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.img || !formData.caption.trim()) {
      alert('Please add an image and caption');
      return;
    }

    setIsSubmitting(true);
    try {
      const postData = {
        ...formData,
        postId: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      await onSubmit(postData);
      
      // Reset form
      setFormData({ img: null, caption: '', description: '', tags: '' });
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-responsive py-8">
      <Card className="max-w-5xl mx-auto">
        <CardHeader className="text-center pb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-4xl bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Share Your Style
            </CardTitle>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Show off your outfit and inspire the community with your unique fashion sense
          </p>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                  <Camera className="w-6 h-6 text-pink-500" />
                  Upload Your Outfit
                </label>
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className={`
                      block w-full h-96 border-3 border-dashed rounded-3xl cursor-pointer
                      transition-all duration-300 hover:scale-[1.02] group
                      ${imagePreview 
                        ? 'border-pink-300 dark:border-pink-600 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-400 dark:hover:border-pink-500 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'
                      }
                    `}
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full rounded-3xl overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="glass-effect rounded-full p-4">
                            <Upload className="w-8 h-8 text-pink-600" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full space-y-6 text-gray-500 dark:text-gray-400">
                        <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ImageIcon className="w-10 h-10 text-pink-500" />
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-semibold mb-2">Click to upload your outfit</p>
                          <p className="text-sm">PNG, JPG up to 10MB</p>
                          <p className="text-xs text-pink-500 mt-2">Show the world your style! ✨</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Caption */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                    <Type className="w-6 h-6 text-rose-500" />
                    Caption
                  </label>
                  <input
                    type="text"
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    placeholder="Give your outfit a catchy title..."
                    className="input-elegant text-lg"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                    <FileText className="w-6 h-6 text-purple-500" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your outfit, where you got it, styling tips..."
                    rows={5}
                    className="input-elegant resize-none"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-xl font-bold text-gray-800 dark:text-gray-200">
                    <Tag className="w-6 h-6 text-yellow-500" />
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="casual, summer, vintage, OOTD (separate with commas)"
                    className="input-elegant"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Add tags to help others discover your style
                  </p>
                </div>

                {/* Popular Tags */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Popular Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {['#OOTD', '#Casual', '#Chic', '#Vintage', '#Summer', '#Trendy'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const currentTags = formData.tags;
                          const tagWithoutHash = tag.substring(1);
                          if (!currentTags.includes(tagWithoutHash)) {
                            setFormData(prev => ({
                              ...prev,
                              tags: currentTags ? `${currentTags}, ${tagWithoutHash}` : tagWithoutHash
                            }));
                          }
                        }}
                        className="tag-trending text-xs"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting || !formData.img || !formData.caption.trim()}
                size="lg"
                className="px-16 py-4 text-lg group"
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner mr-3"></div>
                    Sharing Your Style...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Share Your Style
                    <Camera className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default DressForm;