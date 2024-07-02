'use client';
import { UserType } from '@/types';
import { FC, useState } from 'react';
import Table from '@/app/components/base/Table';
import PaginationControls from '@/app/components/base/PaginationControls';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import EditModal from './EditModal';
import axios from '@/lib/axios';

type UsersProps = {
  initialUsers: UserType[];
  page: string | string[];
  perPage: string | string[]
  totalPages: number;
};

const columns: string[] = ['id', 'name', 'email', 'gender', 'status'];

const Users: FC<UsersProps> = ({ initialUsers, page, perPage, totalPages }) => {
  const [users, setUsers] = useState<UserType[]>(initialUsers)
  const [record, setRecord] = useState<UserType>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async (
    page: string | string[],
    perPage: string | string[]
  ): Promise<void> => {
    const { data } = await axios.get<UserType[]>(
      `/public/v2/users?page=${page}&per_page=${perPage}`
    );
    setUsers(data)
  };

  const handleEdit = (row: { [key: string]: any }) => {
    setRecord({ ...row } as UserType);
    setIsModalOpen(true);
  };

  const handleDelete = (row: { [key: string]: any }) => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete ${row.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`/public/v2/users/${row.id}`);
        await fetchUsers(page, perPage)
      }
    });
  };

  const handleSave = async (updatedRecord: UserType) => {
    await axios.put(`/public/v2/users/${updatedRecord.id}`);
    await fetchUsers(page, perPage)
    setIsModalOpen(false);
  };

  return (
    <>
      <Table columns={columns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
      <PaginationControls
        pageName="users"
        hasNextPage={Number(page) < totalPages}
        hasPrevPage={Number(page) > 1}
      />
      <EditModal
        record={record!}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default Users;
