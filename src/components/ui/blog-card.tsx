import { Clock, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export function BlogCard({
  title,
  description,
  image,
  date,
  readTime,
  category,
  slug,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border card-hover"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
        <Image
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div>
          <div className="mb-2">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {category}
            </span>
          </div>
          <h2 className="text-xl font-semibold leading-snug tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}