'use client';

import { FC } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationControlsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageName: string | "/"
};

const PaginationControls: FC<PaginationControlsProps> = ({ hasNextPage, hasPrevPage, pageName }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const perPage = searchParams.get('per_page') ?? '5';

  return (
    <div className="flex gap-2 justify-center items-center">
      <button
        className={`border border-blue-500 rounded p-2 font-bold hover:bg-blue-500 text-black dark:text-white ${
          !hasPrevPage ? 'hover:cursor-not-allowed' : ''
        }`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`${pageName}?page=${Number(page) - 1}&per_page=${perPage}`);
        }}
      >
        &lt;
      </button>

      <p className="font-bold text-black dark:text-white">
        {page} / {Math.ceil(10 / Number(perPage))}
      </p>

      <button
        className={`border border-blue-500 rounded p-2 font-bold hover:bg-blue-500 text-black dark:text-white ${
          !hasNextPage ? 'hover:cursor-not-allowed' : ''
        }`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`${pageName}?page=${Number(page) + 1}&per_page=${perPage}`);
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default PaginationControls;
