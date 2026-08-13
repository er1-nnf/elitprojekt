import Link from "next/link";
import Image from "next/image";
import { localeHref } from "@/lib/locales";

const ProjectCard = (props) => {
  return (
    <Link href={localeHref(props.locale, `/${props.route}/${props.slug}`)}>
      <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-lg group">
        <Image
          src={props.image}
          alt={props.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent p-8 flex flex-col justify-end h-full">
          <h3 className="text-white font-bold text-[26px] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px] max-w-[800px]">
            {props.name}
          </h3>
          <p className="text-white/90 text-[16px] sm:text-[16px] md:text-[17px] lg:text-[17px] xl:text-[18px] 2xl:text-[18px] tracking-wide font-medium max-w-[800px] pt-4">
            {props.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Pin icon for location */}
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <p className="text-white text-xs mt-1">{props.location}</p>
            </div>

            <div className="flex items-center gap-1">
              {/* House icon for type */}
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <p className="text-white text-xs mt-1">{props.type}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
