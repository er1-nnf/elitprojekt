import Link from "next/link";
import Image from "next/image";
import { localeHref } from "@/lib/locales";

const ProjectCard = (props) => {
  return (
    <Link href={localeHref(props.locale, `/${props.route}/${props.slug}`)} className="block w-full group">
      <div className="relative w-full h-[380px] sm:h-[420px] rounded-[12px] sm:rounded-[14px] overflow-hidden bg-card-bg">
        <Image
          src={props.image}
          alt={props.name}
          fill
          quality={60}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-4 pt-4 px-1">
        <h2 className="font-display font-semibold text-[20px] sm:text-[22px] tracking-[-0.01em] text-ink group-hover:underline underline-offset-4 decoration-cta-color decoration-[1.5px]">
          {props.name}
        </h2>
        <span className="flex items-center gap-1 text-[12px] tracking-[0.1em] uppercase text-muted whitespace-nowrap">
          {/* Pin icon for location */}
          <svg
            className="w-3.5 h-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {props.location}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4 pt-1 px-1">
        <p className="text-sm text-light-gray leading-relaxed max-w-[520px]">
          {props.shortDescription}
        </p>
        <span className="text-[12px] tracking-[0.1em] uppercase text-muted whitespace-nowrap">
          {props.type}
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
