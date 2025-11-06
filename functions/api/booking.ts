// Cloudflare Pages Function for handling booking form submissions
interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  message: string;
}

export const onRequestPost: PagesFunction = async (context) => {
  try {
    const data: BookingFormData = await context.request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.date || !data.time || !data.message) {
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

    // Validate date is in the future
    const bookingDate = new Date(`${data.date}T${data.time}`);
    if (bookingDate < new Date()) {
      return new Response(
        JSON.stringify({ error: 'Booking date must be in the future' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Booking submission:', data);

    // Send confirmation email to client
    // Uncomment and configure with your email service
    /*
    const resendApiKey = context.env.RESEND_API_KEY;

    // Email to team
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'bookings@yoursite.com',
        to: 'hello@yoursite.com',
        subject: `New Booking: ${data.name} - ${data.date} at ${data.time}`,
        html: `
          <h2>New Consultation Booking</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          <p><strong>Project Details:</strong></p>
          <p>${data.message}</p>
        `,
      }),
    });

    // Confirmation email to client
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'bookings@yoursite.com',
        to: data.email,
        subject: 'Consultation Booking Confirmed',
        html: `
          <h2>Thank You for Booking!</h2>
          <p>Hi ${data.name},</p>
          <p>Your consultation has been confirmed for:</p>
          <p><strong>${data.date} at ${data.time}</strong></p>
          <p>We'll send you a calendar invite shortly with meeting details.</p>
          <p>Looking forward to discussing your project!</p>
        `,
      }),
    });
    */

    // Store in database (optional - using Cloudflare D1)
    /*
    await context.env.DB.prepare(
      'INSERT INTO bookings (name, email, phone, date, time, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(
      data.name,
      data.email,
      data.phone || null,
      data.date,
      data.time,
      data.message,
      'pending',
      new Date().toISOString()
    ).run();
    */

    // Integrate with calendar API (Google Calendar, Calendly, etc.)
    // This would create the actual calendar event

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking confirmed! Check your email for details.',
        booking: {
          date: data.date,
          time: data.time,
        },
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
    console.error('Booking form error:', error);
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
