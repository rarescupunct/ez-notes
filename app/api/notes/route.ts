import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import { notes } from "@/lib/schema";

export async function GET() {
    try {
        const allNotes = await db.select().from(notes);
        return NextResponse.json(allNotes);
    } catch (error) {
        console.error('DB error: ', error);
        return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, body } = await request.json();
        const newNote = await db.insert(notes).values({ name, body }).returning();
        return NextResponse.json(newNote);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
    }
}