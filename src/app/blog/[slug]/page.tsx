import { blogPosts } from "../data";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type BlogParams = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(
  { params }: BlogParams
): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogParams) {
  const { slug } = await params;
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Link 
        href="/blog"
        className="text-blue-500 hover:text-blue-700 mb-8 inline-block"
      >
        ← Back to Blog
      </Link>

      <article className="max-w-3xl mx-auto">
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <p className="text-xl text-gray-300 dark:text-gray-400 mb-8">
          {post.description}
        </p>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-xl mb-8">{post.content}</p>

          <div className="space-y-8">
            {post.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}