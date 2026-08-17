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
          preload="auto"
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

      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-8 sm:pb-10">
        <Link
          href={localeHref(locale, "/in-plan/projekt-zagreb-rudes")}
          className="flex items-center gap-3 font-display font-semibold tracking-[-0.015em] text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer group"
        >
          Projekt Zagreb - Rudeš
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-cta-color group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
        <span className="hidden sm:block text-[12px] tracking-[0.12em] uppercase text-white/90 pb-2">
          {locale === "hr" ? "Trenutno u planu" : "Now in plan"}
        </span>
      </div>
    </div>
  );
};

export default FullScreenVideoSection;
