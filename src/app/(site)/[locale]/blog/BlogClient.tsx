'use client';

import { useState } from 'react';
import type { BlogPostMeta } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';
import BlogCategoryFilter from '@/components/BlogCategoryFilter';

export default function BlogClient({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: string[];
}) {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const filtered = currentCategory
    ? posts.filter((p) => p.category === currentCategory)
    : posts;

  return (
    <>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8">
          <BlogCategoryFilter
            categories={categories}
            currentCategory={currentCategory}
            onCategoryChange={setCurrentCategory}
          />
        </div>
      )}

      {/* Posts Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-[#7F8C8D] py-16">
          {currentCategory ? 'No posts in this category.' : 'No posts yet.'}
        </p>
      )}
    </>
  );
}
