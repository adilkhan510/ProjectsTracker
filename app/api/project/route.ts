import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req, res) {
  console.log('create project');
  const body = await req.json();
  console.log('cookies', process.env.COOKIE_NAME);
  const user = await validateJWT(req.cookies['COOKIE_NAME']);
  console.log(user, 'USER');

  const dbRes = await db.project.create({
    data: {
      name: body.name,
      ownerId: `f81e5d0f-98d9-41e1-9552-f3f1cdeb207b`,
    },
  });
  console.log(dbRes, 'DB RES');
  if (dbRes) {
    return new Response(
      JSON.stringify({
        message: 'Project created',
        status: 200,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        message: 'Project not created',
        status: 400,
      })
    );
  }
}
