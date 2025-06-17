
/**
 * Utility functions for handling images across the application
 */

export const getOptimizedImageUrl = (url: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
}) => {
  const { width = 400, height = 400, quality = 80, format = 'auto' } = options || {};
  
  // Check if it's an Unsplash URL and optimize it
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=face&auto=format&q=${quality}`;
  }
  
  // For other image URLs, return as-is or add basic optimization if possible
  return url;
};

export const getImageFallback = (type: 'profile' | 'course' | 'mentor' = 'profile') => {
  const fallbacks = {
    profile: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    course: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&auto=format&q=80',
    mentor: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80'
  };
  
  return fallbacks[type];
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};
