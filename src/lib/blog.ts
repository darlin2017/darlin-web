import { client, type MicroCMSImage } from './microcms';

export const PAGE_SIZE = 10;

export type BlogPost = {
  id: string;
  data: {
    title: string;
    publishDate: Date;
    eyecatch: MicroCMSImage | null;
    content: string;
    author: string;
  };
};

type BlogPostResponse = {
  id: string;
  title: string;
  publishDate: string;
  eyecatch: MicroCMSImage | null;
  content: string;
  author: string;
};

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export async function getSortedPosts(): Promise<BlogPost[]> {
  const { contents } = await client.getList<BlogPostResponse>({
    endpoint: 'blog',
    queries: { limit: 100, orders: '-publishDate' },
  });

  const posts = contents.map((post) => ({
    id: post.id,
    data: {
      title: post.title,
      publishDate: new Date(post.publishDate),
      eyecatch: post.eyecatch ?? null,
      content: post.content,
      author: post.author,
    },
  }));

  return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export type ArchivePost = {
  id: string;
  title: string;
  author: string;
};

export type ArchiveGroup = {
  year: number;
  posts: ArchivePost[];
};

export function getArchiveGroups(posts: BlogPost[]): ArchiveGroup[] {
  const yearToPosts = new Map<number, ArchivePost[]>();

  for (const post of posts) {
    const year = post.data.publishDate.getFullYear();
    if (!yearToPosts.has(year)) yearToPosts.set(year, []);
    yearToPosts.get(year)!.push({ id: post.id, title: post.data.title, author: post.data.author });
  }

  return [...yearToPosts.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, yearPosts]) => ({ year, posts: yearPosts }));
}
