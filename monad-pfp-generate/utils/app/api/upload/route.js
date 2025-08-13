import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = Date.now() + '_' + file.name.replaceAll(' ', '_');
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    
    await writeFile(filepath, buffer);
    
    const imageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/${filename}`;
    
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}