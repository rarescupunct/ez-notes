import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import { notes } from "@/lib/schema";

export async function GET() {
    const allNotes = await db.select().from(notes);
    return NextResponse.json(allNotes);
}

export async function POST(request: Request) {
    const { name, body } = await request.json();
    const newNote = await db.insert(notes).values({ name, body }).returning();
    return NextResponse.json(newNote);
}