// Cloudflare Pages Function for AI Chatbot using Workers AI
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export const onRequestPost: PagesFunction<{
  AI: any;
}> = async (context) => {
  try {
    const { message, history = [] }: ChatRequest = await context.request.json();

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // System prompt to customize the chatbot for your agency
    const systemPrompt = `You are a helpful AI assistant for an award-winning digital agency.

Our services include:
- Web Development (React, Next.js, Astro, custom solutions)
- UI/UX Design (modern, user-centered design)
- Branding (complete brand identity systems)
- SEO & Marketing (data-driven growth strategies)
- Cloud Solutions (Cloudflare, AWS, scalable infrastructure)
- Consulting (technology strategy and digital transformation)

Key features:
- We deliver projects on time with exceptional performance
- Lighthouse 100/100 scores on all metrics
- Global deployment on Cloudflare's edge network
- 98% client satisfaction rate

Be friendly, professional, and helpful. Answer questions about our services, pricing (mention we offer free consultations), portfolio, and process. If asked to book a meeting, direct them to /booking page. For detailed questions, suggest contacting via the contact form or booking a call.`;

    // Prepare messages for the AI
    const messages: ChatMessage[] = [
      { role: 'assistant', content: systemPrompt },
      ...history,
      { role: 'user', content: message },
    ];

    // Use Cloudflare Workers AI
    // Note: You need to bind the AI in your wrangler.toml
    // Uncomment this section when deploying to Cloudflare
    /*
    const response = await context.env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
      messages: messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      })),
    });

    const aiResponse = response.response;
    */

    // For local development or testing, use a simple response
    // Remove this in production and use the AI response above
    const aiResponse = generateMockResponse(message);

    return new Response(
      JSON.stringify({
        success: true,
        response: aiResponse,
        timestamp: new Date().toISOString(),
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
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({
        error: 'Sorry, I encountered an error. Please try again or contact us directly.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Mock response for development/testing
function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "Our pricing varies based on project scope and requirements. We offer competitive rates and flexible packages. I'd recommend booking a free consultation where we can discuss your specific needs and provide a detailed quote. You can book at /booking";
  }

  if (lowerMessage.includes('service') || lowerMessage.includes('what do you')) {
    return "We offer comprehensive digital services including Web Development, UI/UX Design, Branding, SEO & Marketing, Cloud Solutions, and Consulting. Each service is tailored to your business needs. Would you like to know more about any specific service?";
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
    return "You can reach us through our contact form at the bottom of the homepage, call us, or book a free consultation at /booking. We typically respond within 24 hours!";
  }

  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
    return "We've delivered 500+ successful projects across various industries including e-commerce, SaaS, fintech, and more. Check out our portfolio section on the homepage to see some of our featured work, or I can help answer specific questions about our experience.";
  }

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! 👋 Welcome to our agency. I'm here to help answer questions about our services, portfolio, and how we can help your business. What would you like to know?";
  }

  if (lowerMessage.includes('book') || lowerMessage.includes('meeting') || lowerMessage.includes('call')) {
    return "I'd be happy to help you schedule a consultation! You can book a free 30-minute discovery call at /booking. We'll discuss your project, timeline, and how we can help bring your vision to life.";
  }

  return "Thanks for your message! I'm here to help with questions about our services, portfolio, pricing, and process. Feel free to ask anything, or you can book a free consultation at /booking to discuss your project in detail.";
}

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
