import {put}  from '@vercel/blob';
import { db } from '@/lib/db';
import {notes} from '@/lib/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try{
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const name = formData.get('name') as string;

        if(!file || !name){
            return NextResponse.json({error: 'Missing file or name'}, {status: 400});
        }
        const blob = await put(file.name, file, {access: 'public'});

        const newNote = await db.insert(notes).values({
            name,
            type: 'image',
            imageUrl: blob.url,
        }).returning();

        return NextResponse.json(newNote[0]);

    }
    catch(error){
        console.error('Upload error:', error);
        return NextResponse.json({error: String(error)}, {status: 500});
    }
}