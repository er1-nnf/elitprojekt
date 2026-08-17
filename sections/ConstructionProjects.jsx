"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { localeHref } from "@/lib/locales";

const ConstructionProjects = ({ locale, content, projects }) => {
  // Sort projects by sortNumber (ascending: 1, 2, 3, etc.)
  const sortedProjects = [...(projects ?? [])].sort((a, b) => {
    const sortA = a.sortNumber || 0;
    const sortB = b.sortNumber || 0;
    return sortA - sortB;
  });

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col gap-3 sm:gap-4 items-center justify-center pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-white w-full py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h3 className="font-display font-semibold text-[34px] sm:text-[44px] md:text-[48px] xl:text-[54px] text-center leading-tight tracking-[-0.02em] text-ink text-balance">
          {content?.inConstructionTitle}
        </h3>

        <p className="font-normal text-sm sm:text-[15px] text-center leading-relaxed max-w-[90%] sm:max-w-[520px] text-light-gray px-2">
          {content?.inConstructionSubtitle}
        </p>

        {/* Swiper Container with Custom Navigation */}
        <div className="w-full pt-8 sm:pt-10 md:pt-12 px-0 lg:px-8 pl-4 relative">
          <Swiper
            speed={500}
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1.1}
            spaceBetween={12}
            navigation={{
              enabled:
                typeof window !== "undefined" && window.innerWidth >= 768,
              nextEl: ".swiper-button-next-custom-construction",
              prevEl: ".swiper-button-prev-custom-construction",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.1,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 1.2,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 32,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 48,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 64,
              },
            }}
          >
            {sortedProjects?.map((project) => (
              <SwiperSlide key={project.id}>
                <Link href={localeHref(locale, `/in-construction/${project.slug}`)} className="block w-full group">
                  <div className="relative w-full h-[340px] sm:h-[380px] rounded-[12px] overflow-hidden bg-card-bg">
                    <Image
                      src={project.coverImage.url}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-4 px-1 pb-1">
                    <h3 className="font-display font-semibold text-[18px] sm:text-[19px] tracking-[-0.01em] text-ink leading-snug group-hover:underline underline-offset-4 decoration-cta-color decoration-[1.5px]">
                      {project.name}
                    </h3>
                    {project.location && (
                      <span className="text-[11px] tracking-[0.1em] uppercase text-muted whitespace-nowrap">
                        {project.location}
                      </span>
                    )}
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows - Bottom Right */}
          <div className="flex items-center justify-end gap-3 mt-8 hidden md:flex">
            <div className="swiper-button-prev-custom-construction w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 transition-all duration-200 group">
              <svg
                className="w-5 h-5 text-dark-text group-hover:text-black transition-colors"
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

            <div className="swiper-button-next-custom-construction w-12 h-12 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-50 hover:scale-105 transition-all duration-200 group">
              <svg
                className="w-5 h-5 text-dark-text group-hover:text-black transition-colors"
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
          </div>
        </div>

        {/* Hide default Swiper navigation and style pagination */}
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
          .swiper-pagination {
            position: relative !important;
            margin-top: 100px !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ConstructionProjects;
