import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const username = body.username;
    const password = body.password;

    console.log('Login attempt:', username);

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password are required' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
          } 
        }
      );
    }

    // For development, use simple check (admin/admin123)
    if (username === 'admin' && password === 'admin123') {
      const token = `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      console.log('✅ Login successful');

      return new Response(
        JSON.stringify({
          success: true,
          token: token,
          user: { username: 'admin', email: 'admin@yoursite.com' },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    console.log('❌ Invalid credentials');

    return new Response(
      JSON.stringify({ error: 'Invalid username or password' }),
      { 
        status: 401, 
        headers: { 
          'Content-Type': 'application/json',
        } 
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
        } 
      }
    );
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

