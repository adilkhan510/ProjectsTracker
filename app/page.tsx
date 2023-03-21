import Image from 'next/image';
import { Inter } from 'next/font/google';
import { db } from '@/lib/db';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const user = await getUser();
  return (
    <div>
      <h1>User</h1>
      <div>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}

const getUser = async () => {
  const res = await db.user.findUnique({
    where: {
      email: 'user@email.com',
    },
  });
  if (!res) return null;
  return res;
};
