import Link from 'next/link';
import axios from '@/lib/axios';
import { BlogPostType } from '@/types';
import { FC } from 'react';
import PaginationControls from './components/base/PaginationControls';

type HomeProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const page = searchParams.page ?? '1';
  const perPage = searchParams.per_page ?? '5';

  const { data: posts } = await axios.get<BlogPostType[]>(
    `/public/v2/posts?page=${page}&per_page=${perPage}`
  );
  const { data: totalData } = await axios.get<BlogPostType[]>(`/public/v2/posts`);
  const totalPages = Math.ceil(totalData.length / 5);

  return (
    <main className="bg-white dark:bg-gray-700 flex min-h-screen flex-col justify-between px-36 py-12 font-inter">
      <h1 className="text-black dark:text-white font-bold text-xl text-center">Blog posts</h1>
      {posts.map((post) => (
        <div className="flex flex-col gap-3" key={post.id}>
          <div className="flex flex-col">
            <p className="text-black dark:text-white font-bold">{post.title}</p>
            <p className="text-black dark:text-white">{post.body.slice(0, 50) + '...'}</p>
          </div>
          <Link
            className="text-black dark:text-white hover:text-blue-500 font-bold"
            href={`/blog/${post.id}`}
          >
            Read More →
          </Link>
        </div>
      ))}

      <PaginationControls pageName='/' hasNextPage={Number(page) < totalPages} hasPrevPage={Number(page) > 1} />
    </main>
  );
};

export default Home;
