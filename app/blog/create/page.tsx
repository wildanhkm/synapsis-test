'use client';
import axios from '@/lib/axios';
import { BlogPostType } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

type Props = {};

const CreatePost: FC = (props: Props) => {
  const router = useRouter();
  const { id } = useParams() ?? '1';
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  });
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
      const { data } = await axios.get<BlogPostType>(`/public/v2/posts/${id}`);
      setPost(data);
      setFormData({
        title: data.title,
        body: data.body,
      });
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

  const onSave = () => {
    withReactContent(Swal)
      .fire({
        icon: 'warning',
        text: 'Are you sure to delete this post?',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Delete',
      })
      .then((res) => {
        if (res.isConfirmed) {
          deletePost(id);
        }
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="bg-white dark:bg-black flex min-h-screen flex-col gap-4 px-36 py-12 font-inter">
      <h1 className="text-black dark:text-white font-bold text-xl text-center">Create New Blog Post</h1>
      <input
        className="text-black border border-black rounded dark:text-white dark:bg-transparent dark:border-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500"
        type="text"
        name="title"
        placeholder="Post Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <textarea
        className="text-black border border-black rounded dark:text-white dark:bg-transparent dark:border-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-blue-500"
        name="body"
        value={formData.body}
        placeholder="Post Body"
        onChange={handleInputChange}
      ></textarea>
      <div className="flex gap-4">
        <Link href="/" className="bg-white dark:bg-black text-black dark:text-white rounded border p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
          Cancel
        </Link>
        <button className="rounded border p-2 bg-blue-500 hover:bg-blue-700" onClick={onSave}>
          Save
        </button>
      </div>
    </main>
  );
};

export default CreatePost;
