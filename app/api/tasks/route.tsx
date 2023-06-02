import { validateJWT } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req, res) {
  const body = await req.body();
  const user = await validateJWT(req.cookies.get(process.env).value);

  if (!user) {
    res.status = 401;
    res.body = { message: 'Unauthorized' };
    return;
  }
  const project = await db.project.findUnique({
    where: {
      ownerId_name: {
        ownerId: user.id,
        name: body.value.name,
      },
    },
  });
  console.log(project);
}
