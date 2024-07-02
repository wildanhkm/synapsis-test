'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { Suspense, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });
const pages = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Users',
    link: '/users', //todo create users page
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<p>Loading...</p>}>
          <header className="bg-white dark:bg-gray-700 flex gap-12 p-12">
            <button
              onClick={toggleTheme}
              className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 bg-white rounded text-black dark:text-white"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            {pages.map((page) => (
              <Link
                className="text-black dark:text-white hover:text-blue-500 hover:font-bold"
                href={page.link}
                key={page.name}
              >
                {page.name}
              </Link>
            ))}
          </header>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
