import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db';
import { comparePasswords, createJWT } from '@/lib/auth';
import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export const response = () => {
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
};

export async function POST(req, res) {
  if (req.method === 'POST') {
    const user = await db.user.findUnique({
      where: {
        email: 'user@email.com',
      },
    });
    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Invalid login',
        })
      );
    }
    const isUser = await comparePasswords(req.body.password, user.password);

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
        })
      );
    }
  } else {
    res.status(402);
    res.end();
  }
}
