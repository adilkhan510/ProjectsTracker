import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { comparePasswords, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  console.log('starting POST');
  if (req.method === 'POST') {
    const user = await db.user.findUnique({
      where: {
        email: 'user@email.com',
      },
    });
    if (!user) {
      res.status(401);
      res.json({ error: 'Invalid login' });
      return;
    }
    // const isUser = await comparePasswords(req.body.password, user.password);
    const isUser = true;
    if (isUser) {
      const jwt = await createJWT(user);
      return new Response(
        JSON.stringify({
          user: {
            id: user.id,
            email: user.email,
          },
          token: jwt,
        }),
        {
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Set-Cookie': serialize(process.env.COOKIE_NAME, jwt, {
              httpOnly: true,
              path: '/',
              maxAge: 60 * 60 * 24 * 7,
            }),
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: 'Invalid login',
        }),
        {
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  } else {
    res.status(402);
    res.end();
  }
}
