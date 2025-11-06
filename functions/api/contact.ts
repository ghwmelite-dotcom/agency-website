// Cloudflare Pages Function for handling contact form submissions
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

export const onRequestPost: PagesFunction = async (context) => {
  try {
    const data: ContactFormData = await context.request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Here you can integrate with your email service
    // Examples: SendGrid, Resend, Mailgun, etc.
    // For now, we'll log it (in production, send actual email)

    console.log('Contact form submission:', data);

    // Example: Send email using Resend API
    // Uncomment and add your API key in environment variables
    /*
    const resendApiKey = context.env.RESEND_API_KEY;
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@yoursite.com',
        to: 'hello@yoursite.com',
        subject: `New Contact Form: ${data.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.service ? `<p><strong>Service:</strong> ${data.service}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `,
      }),
    });
    */

    // Store in database (optional - using Cloudflare D1)
    // Uncomment if you have D1 database configured
    /*
    await context.env.DB.prepare(
      'INSERT INTO contacts (name, email, company, service, message, created_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(
      data.name,
      data.email,
      data.company || null,
      data.service || null,
      data.message,
      new Date().toISOString()
    ).run();
    */

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
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
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Handle OPTIONS request for CORS
export const onRequestOptions: PagesFunction = () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
