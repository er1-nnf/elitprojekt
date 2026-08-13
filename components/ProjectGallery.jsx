"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Left-column image galleries for project detail pages (main gallery +
// optional apartment one/two galleries). Ported 1:1 from the old
// InPlanDetails/InConstructionDetails pages — markup and behavior preserved.
const ProjectGallery = ({ name, images, apartOneImages, apartTwoImages }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div className="space-y-4">
        {/* Main Gallery */}
        <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: ".property-swiper-button-next",
              prevEl: ".property-swiper-button-prev",
            }}
            pagination={{
              clickable: true,
            }}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="w-full h-full"
          >
            {images?.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.url}
                  alt={`${name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}

            {/* Custom Navigation Arrows */}
            <div className="property-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
              <svg
                className="w-5 h-5 text-dark-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>

            <div className="property-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
              <svg
                className="w-5 h-5 text-dark-text"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Swiper>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images?.map((img, index) => (
            <button
              key={index}
              onClick={() => {
                // Find the swiper instance and go to slide
                const swiperEl = document.querySelector(".swiper");
                if (swiperEl && swiperEl.swiper) {
                  swiperEl.swiper.slideToLoop(index);
                }
              }}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                activeSlide === index
                  ? "border-black shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={64}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Apartment One Gallery - Conditional */}
      {apartOneImages && apartOneImages.length > 0 && (
        <div className="space-y-4 mt-8">
          {/* Apartment One Main Gallery */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: ".apart-one-swiper-button-next",
                prevEl: ".apart-one-swiper-button-prev",
              }}
              pagination={{
                clickable: true,
              }}
              className="w-full h-full"
            >
              {apartOneImages.map((media, index) => (
                <SwiperSlide key={index}>
                  {media.mime?.startsWith("video/") ? (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      controls
                      muted
                    />
                  ) : (
                    <Image
                      src={media.url}
                      alt={`Apartment 1 - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                  )}
                </SwiperSlide>
              ))}

              {/* Custom Navigation Arrows */}
              <div className="apart-one-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
                <svg
                  className="w-5 h-5 text-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>

              <div className="apart-one-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
                <svg
                  className="w-5 h-5 text-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Swiper>
          </div>

          {/* Apartment One Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {apartOneImages.map((media, index) => (
              <button
                key={index}
                onClick={() => {
                  const swiperEl =
                    document.querySelector(".apart-one-swiper");
                  if (swiperEl && swiperEl.swiper) {
                    swiperEl.swiper.slideToLoop(index);
                  }
                }}
                className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-all duration-200 relative"
              >
                {media.mime?.startsWith("video/") ? (
                  <>
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <Image
                    src={media.url}
                    alt={`Apartment 1 Thumbnail ${index + 1}`}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Apartment Two Gallery - Conditional */}
      {apartTwoImages && apartTwoImages.length > 0 && (
        <div className="space-y-4 mt-8 mb-16">
          {/* Apartment Two Main Gallery */}
          <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              loop={true}
              navigation={{
                nextEl: ".apart-two-swiper-button-next",
                prevEl: ".apart-two-swiper-button-prev",
              }}
              pagination={{
                clickable: true,
              }}
              className="w-full h-full apart-two-swiper"
            >
              {apartTwoImages.map((media, index) => (
                <SwiperSlide key={index}>
                  {media.mime?.startsWith("video/") ? (
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      controls
                      muted
                    />
                  ) : (
                    <Image
                      src={media.url}
                      alt={`Apartment 2 - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                  )}
                </SwiperSlide>
              ))}

              {/* Custom Navigation Arrows */}
              <div className="apart-two-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
                <svg
                  className="w-5 h-5 text-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>

              <div className="apart-two-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-white transition-all duration-200">
                <svg
                  className="w-5 h-5 text-dark-text"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Swiper>
          </div>

          {/* Apartment Two Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {apartTwoImages.map((media, index) => (
              <button
                key={index}
                onClick={() => {
                  const swiperEl =
                    document.querySelector(".apart-two-swiper");
                  if (swiperEl && swiperEl.swiper) {
                    swiperEl.swiper.slideToLoop(index);
                  }
                }}
                className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-gray-400 transition-all duration-200 relative"
              >
                {media.mime?.startsWith("video/") ? (
                  <>
                    <video
                      src={media.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <Image
                    src={media.url}
                    alt={`Apartment 2 Thumbnail ${index + 1}`}
                    width={80}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectGallery;
