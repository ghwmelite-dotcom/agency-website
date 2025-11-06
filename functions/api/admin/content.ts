// Content management API endpoint
interface ContentData {
  [key: string]: string;
}

// In-memory storage for development (use D1 database in production)
const contentStore: ContentData = {
  hero_title: 'Crafting Digital Excellence That Drives Results',
  hero_subtitle: 'We design and build stunning, high-performance websites and digital experiences for forward-thinking businesses ready to dominate their industry.',
  hero_stat1_number: '500+',
  hero_stat1_label: 'Projects Delivered',
  hero_stat2_number: '98%',
  hero_stat2_label: 'Client Satisfaction',
  hero_stat3_number: '50+',
  hero_stat3_label: 'Team Members',
  site_name: 'Your Agency Name',
  site_tagline: 'Crafting Digital Excellence',
  site_email: 'hello@yoursite.com',
  site_phone: '+1 (555) 123-4567',
};

// GET - Fetch content
export async function onRequestGet() {
  try {
    // In production, fetch from database
    // For now, return in-memory content

    return new Response(
      JSON.stringify({
        success: true,
        content: contentStore,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Content fetch error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch content' }),
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

// POST - Update content
export async function onRequestPost({ request }: { request: Request }) {
  try {
    const body = await request.json() as { content: ContentData };
    const { content } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content data is required' }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Verify auth token (simplified for development)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          } 
        }
      );
    }

    // Update in-memory storage (use database in production)
    Object.assign(contentStore, content);

    console.log('Content updated:', content);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Content updated successfully',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Content update error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update content' }),
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

