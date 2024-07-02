'use client';
import React, { ReactNode } from 'react';

type EditModalProps = {
  children: ReactNode;
};

const EditModal: React.FC<EditModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg w-1/2">{children}</div>
    </div>
  );
};

export default EditModal;
