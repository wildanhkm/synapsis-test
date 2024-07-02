// import Link from 'next/link';
import axios from '@/lib/axios';
import { UserType } from '@/types';
import { FC } from 'react';
import UserTable from '@/app/components/users/UserTable';

type UsersProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const fetchUsers = async (
  page: string | string[],
  perPage: string | string[]
): Promise<{ users: UserType[]; totalPages: number }> => {
  const { data: users } = await axios.get<UserType[]>(
    `/public/v2/users?page=${page}&per_page=${perPage}`
  );
  const { data: totalData } = await axios.get<UserType[]>(`/public/v2/users`);
  const totalPages = Math.ceil(totalData.length / 5);
  return { users, totalPages };
};

const Users: FC<UsersProps> = async ({ searchParams }) => {
  const page = searchParams.page ?? '1';
  const perPage = searchParams.per_page ?? '5';

  const { users, totalPages } = await fetchUsers(page, perPage);

  return (
    <main className="bg-white dark:bg-gray-700 flex min-h-screen flex-col gap-12 px-36 py-12 font-inter">
      <h1 className="text-black dark:text-white font-bold text-xl text-center">Users List</h1>
      <UserTable initialUsers={users} page={page} perPage={perPage} totalPages={totalPages} />
    </main>
  );
};

export default Users;
