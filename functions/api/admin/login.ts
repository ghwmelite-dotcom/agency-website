// Admin login API endpoint
interface LoginRequest {
  username: string;
  password: string;
}

// Generate session token
function generateToken(): string {
  return `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function onRequestPost({ request }: { request: Request }) {
  try {
    const body = await request.json() as LoginRequest;
    const { username, password } = body;

    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password are required' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // For development, use simple check (admin/admin123)
    // In production, query database and verify password hash
    if (username === 'admin' && password === 'admin123') {
      // Generate session token
      const token = generateToken();

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
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid username or password' }),
      { 
        status: 401, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        } 
      }
    );
  }
}

// Handle OPTIONS request for CORS
export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

