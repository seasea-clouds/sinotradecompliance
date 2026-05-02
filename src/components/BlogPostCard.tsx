import Link from 'next/link';
import type { BlogPostMeta } from '@/lib/blog';

export default function BlogPostCard({ post }: { post: BlogPostMeta }) {
  return (
    <article className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Cover Image */}
      <div className="aspect-[16/9] bg-primary-navy/10 overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-navy/30 text-6xl font-bold">
            {post.category.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        {/* Category Badge */}
        <span className="inline-block self-start px-3 py-1 text-xs font-semibold text-primary-navy bg-primary-navy/10 rounded-full mb-3">
          {post.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-2 group-hover:text-primary-navy transition-colors">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#7F8C8D] text-sm mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Date + Read More */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F4F6F9]">
          <time className="text-xs text-[#7F8C8D]">{post.date}</time>
          <Link
            href={`/${post.locale}/blog/${post.slug}/`}
            className="text-sm font-semibold text-[#D4AF37] hover:text-[#1B365D] transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
