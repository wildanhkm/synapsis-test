'use client';
import React, { useState, useEffect } from 'react';
import { UserType } from '@/types';
import Modal from '@/app/components/base/Modal';
import RadioGroup from '../base/RadioGroup';
import Select from '../base/Select';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: UserType) => void;
  record: UserType;
};

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, record }) => {
  const [formData, setFormData] = useState<UserType>({
    id: 0,
    email: '',
    gender: '',
    name: '',
    status: '',
  });

  useEffect(() => {
    if (record) {
      setFormData({ ...record });
    }
  }, [record]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (record) {
      onSave({ ...record, ...formData });
    }
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <h2 className="text-black dark:text-white text-xl font-bold mb-4">Edit User</h2>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">User ID</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="User ID"
          disabled
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-black dark:text-white cursor-not-allowed"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">User Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="User Name"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300">User Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="User Email"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-black dark:text-white"
        />
      </div>
      <div className="mb-4">
        <RadioGroup
          name="gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          defaultValue={formData.gender}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <Select
          name="status"
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
          value={formData.status}
          onChange={handleChange}
          label="Status"
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="mr-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
