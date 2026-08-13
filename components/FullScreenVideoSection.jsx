"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { localeHref } from '@/lib/locales';

const FullScreenVideoSection = ({ locale, videoUrl = "/video/elitProjektVideo_optimized.mp4", posterImage }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Lazy load video when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play when video is loaded and in view
  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented, that's ok
      });
    }
  }, [videoLoaded]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const handleCanPlay = () => {
    setVideoLoaded(true);
    setIsPlaying(true);
  };

  return (
    <div ref={containerRef} className="w-full relative bg-gray-900">
      {isInView ? (
        <video
          ref={videoRef}
          className="w-full h-[700px] object-cover cursor-pointer"
          muted={isMuted}
          loop={true}
          playsInline
          preload="none"
          poster={posterImage}
          onEnded={handleVideoEnded}
          onClick={handleVideoClick}
          onCanPlay={handleCanPlay}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-[700px] bg-gray-900 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>

      <div className="absolute bottom-8 left-8 text-white">
        <Link
          href={localeHref(locale, "/in-plan/projekt-zagreb-rudes")}
          className="flex items-center gap-3 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px] font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer group"
        >
          Projekt Zagreb - Rudeš
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-10 xl:h-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FullScreenVideoSection;
