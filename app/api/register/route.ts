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
  const body = await req.json();

  if (req.method === 'POST' && body.email && body.password) {
    const res = await db.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    if (!res) {
      return new Response(
        JSON.stringify({
          error: 'Could not create user',
        })
      );
    }

    return new Response(
      JSON.stringify({
        message: 'User created',
      })
    );
  }
}
