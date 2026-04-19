import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    
    const response = await fetch(`${BACKEND_URL}/api/translation/pdf`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return NextResponse.json(errorData, { status: response.status });
    }

    // Since it's a file buffer, we clone the response headers and return the blob
    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', response.headers.get('Content-Disposition') || 'attachment; filename="translated.pdf"');

    return new NextResponse(blob, { status: 200, headers });
  } catch (error) {
    console.error('Translation PDF error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
