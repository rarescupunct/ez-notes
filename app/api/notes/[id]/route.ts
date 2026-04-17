import{db} from "@/lib/db";
import {NextResponse} from "next/server";
import { notes } from "@/lib/schema";
import { eq }  from "drizzle-orm";

export async function PATCH(req: Request, {params}:{params: {id: number}}) {
    const { name, body } = await req.json();
    const updated = await db.update(notes)
                .set({ name, body, editedAt: new Date() })
                .where(eq(notes.id, params.id))
                .returning();
    return NextResponse.json(updated[0]);
}


export async function DELETE(_req: Request, {params}:{params: {id: number}}) {
    await db.delete(notes).where(eq(notes.id, params.id));
    return NextResponse.json({success : true});
}