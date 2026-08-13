import Link from "next/link";
import Image from "next/image";
import { localeHref } from "@/lib/locales";

const BlogPost = (props) => {
  return (
    <div className='flex flex-col gap-4 max-w-[512px]'>
      <Link href={localeHref(props.locale, `/blog/${props.slug}`)}>
      <Image alt={props.name} width={512} height={640} sizes="(max-width: 640px) 100vw, 512px" className='max-h-[650px] object-cover rounded-[40px] aspect-4/5' src={props.image} />
      </Link>
      <Link href={localeHref(props.locale, `/blog/${props.slug}`)}>
      <h1 className='font-semibold text-black text-xl px-6 hover:underline'>{props.name}</h1>
      </Link>
      <p className='text-sm text-pretty text-black px-6'>{props.shortDescription}</p>
    </div>
  )
}

export default BlogPost
