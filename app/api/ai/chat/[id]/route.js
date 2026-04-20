import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function GET(request, { params }) {
  try {

    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
const BACKEND_URL =
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const response = await fetch(`${BACKEND_URL}/api/ai/chat/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(
      {
        messages: data.messages || [],
        mode: data.mode || 'Ask',
      },
      { status: response.status }
    );
  } catch (error) {
    console.error('AI chat GET proxy error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
