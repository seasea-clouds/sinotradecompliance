import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { locales } from '@/i18n/routing';

export { locales };

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  contentHtml: string;
  locale: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  locale: string;
}

function parsePost(filePath: string, locale: string): BlogPost | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = path.basename(filePath, '.mdx');

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || '',
      excerpt: data.excerpt || '',
      coverImage: data.coverImage || '',
      contentHtml: '',
      locale,
    };
  } catch {
    return null;
  }
}

async function renderContent(filePath: string): Promise<string> {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);
  const result = await remark().use(remarkHtml).process(content);
  return result.toString();
}

export function getLocaleDir(locale: string): string {
  return path.join(BLOG_DIR, locale);
}

export function getAllPostSlugs(locale: string): string[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => f.replace(/\.mdx?$/, ''));
}

export function getAllPostsMeta(locale: string): BlogPostMeta[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((f) => {
      const filePath = path.join(dir, f);
      return parsePost(filePath, locale);
    })
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (b.date > a.date ? 1 : -1))
    .map(({ contentHtml: _, ...meta }) => meta);
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(getLocaleDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const meta = parsePost(filePath, locale);
  if (!meta) return null;

  const contentHtml = await renderContent(filePath);

  return {
    ...meta,
    contentHtml,
  };
}

export function getCategories(locale: string): string[] {
  const posts = getAllPostsMeta(locale);
  const categories = [...new Set(posts.map((p) => p.category))];
  return categories.sort();
}

export function getPostsByCategory(
  locale: string,
  category: string
): BlogPostMeta[] {
  return getAllPostsMeta(locale).filter((p) => p.category === category);
}
