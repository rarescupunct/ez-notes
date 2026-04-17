import { db } from '@/lib/db';
import { notes } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { name, body } = await req.json();
  const updated = await db.update(notes)
    .set({ name, body, editedAt: new Date() })
    .where(eq(notes.id, Number(id)))
    .returning();
  return NextResponse.json(updated[0]);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(notes).where(eq(notes.id, Number(id)));
  return NextResponse.json({ success: true });
}