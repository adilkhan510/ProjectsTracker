import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req, res) {
  const body = await req.json();

  const user = await validateJWT(
    req.cookies.get(process.env.COOKIE_NAME).value
  );

  const dbRes = await db.project.create({
    data: {
      name: body.name,
      ownerId: user.id,
    },
  });

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
