import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { TASK_STATUS } from '@prisma/client';
import { cookies } from 'next/headers';
import Button from './Button';
import Card from './Card';
import NewTask from './NewTask';

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: 'asc',
    },
  });

  return tasks;
};

const TaskCard = async ({ title, tasks, shouldAddMarginTop }) => {
  const data = tasks || (await getData());

  return (
    <Card className='flex justify-between items-center'>
      <div className='w-1/3'>
        {data && data.length ? (
          <div>
            {data.map((task, key) => (
              <div className='py-2' key={key}>
                <div>
                  <span className='text-gray-800'>{task.name}</span>
                </div>
                <div>
                  <span className='text-gray-400 text-sm'>
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='w-1/3'>No Tasks</div>
        )}
      </div>
      <div className='flex justify-between items-center w-1/3'>
        <div>
          <span className='text-3xl text-gray-600'>{title}</span>
        </div>
        <div>
          <NewTask shouldAddMarginTop={shouldAddMarginTop} />
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
