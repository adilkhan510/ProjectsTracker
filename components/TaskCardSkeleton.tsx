const TaskCardSkeleton = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-32 p-4 bg-white rounded-md shadow-md'>
      <div className='w-full h-4 bg-gray-200 rounded-md'></div>
      <div className='w-full h-4 bg-gray-200 rounded-md mt-2'></div>
      <div className='w-full h-4 bg-gray-200 rounded-md mt-2'></div>
      <div className='w-full h-4 bg-gray-200 rounded-md mt-2'></div>
    </div>
  );
};

export default TaskCardSkeleton;
