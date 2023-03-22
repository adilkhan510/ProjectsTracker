export async function GET(request: Request) {
  // return a object with a status code and a body
  return new Response('Hello world!', {
    headers: {
      'content-type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
