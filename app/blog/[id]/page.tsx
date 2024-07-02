'use client';
import axios from '@/lib/axios';
import { BlogPostType, CommentType } from '@/types';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import ProfileImage from '@/app/components/base/ProfileImage';

const Loading = () => {
  return (
    <div className="animate-pulse w-full h-40 flex flex-col gap-4">
      <h1 className="font-bold text-xl w-1/2 h-4 bg-slate-500"></h1>
      <p className="w-full h-12 bg-slate-500"></p>
    </div>
  );
};

const Post: FC = () => {
  const router = useRouter();
  const { id } = useParams() ?? '1';
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (id: string | string[]) => {
    try {
      const { status } = await axios.delete(`/public/v2/posts/${id}`);
      if (status.toString().startsWith('2')) {
        router.push('/');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.message);
    }
  };

  const getPost = useCallback(async () => {
    try {
      setLoading(true);
      console.log('axios :>> ', (await axios('/public/v2/posts')).headers);
      const { data } = await axios.get<BlogPostType>(`/public/v2/posts/${id}`);
      const { data: comments } = await axios.get<CommentType[]>(`/public/v2/posts/${id}/comments`);
      setPost(data);
      setComments(comments);
      setError(null);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.message);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <main className="bg-white dark:bg-gray-700 flex min-h-screen flex-col gap-4 px-36 py-12 font-inter">
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-xl text-black dark:text-white">{post?.title}</h1>
              <p className="text-black dark:text-white">{post?.body}</p>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-black dark:text-white text-lg font-bold">
                Comments ({comments?.length ?? '0'})
              </p>
              {comments?.map((c) => (
                <div key={c.id} className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <ProfileImage name={c.name} />
                    <p className="text-black dark:text-white">{c.name}</p>
                  </div>
                  <p className="text-black dark:text-white">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Post;
