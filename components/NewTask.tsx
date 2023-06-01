'use client';

import { useState } from 'react';
import Button from './Button';
import { createNewTask } from '@/lib/api';

const NewTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    createNewTask(task);

    closeModal();
  };

  return (
    <div className='flex justify-center items-center'>
      <Button
        className=' hover:scale-105 transition-all ease-in-out duration-200 text-lg'
        onClick={openModal}
        type='button'
      >
        + Task
      </Button>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-6/12'>
            <h2 className='text-xl font-semibold mb-4'>Create New Task</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>
                  Task Name
                </label>
                <input
                  type='text'
                  className='border border-gray-400 rounded-lg px-4 py-2 w-full'
                  placeholder='Enter task name'
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div className='flex justify-end'>
                <Button intent='primary' className='px-4 py-2' type='button'>
                  Save
                </Button>
                <Button
                  intent='text'
                  className='px-4 py-2 ml-2'
                  onClick={closeModal}
                  type='button'
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTask;
