'use client';

import { useEffect, useState } from 'react';
import NoteEditor from './NoteEditor';
import ImageNoteEditor from './ImageNoteEditor';
import ExportButton from './ExportButton';
import styles from './NoteList.module.css';

type Note = {
  id: number;
  name: string;
  body: string;
  imageUrl?: string;
  type: 'text' | 'image';
  createdAt: string;
  editedAt: string;
};

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selected, setSelected] = useState<Note | null>(null);
  const [editorType, setEditorType] = useState<'text' | 'image' | null>(null);
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      if (!res.ok) throw new Error();
      setNotes(await res.json());
    } catch {
      setNotes([]);
    }
  };

  useEffect(() => {
        async function load(){
        await fetchNotes();
        }
        load();
        }, []);

  const handleDelete = async (id: number) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setSelected(note);
    setEditorType(note.type);
  };

  const handleSave = () => {
    setEditorType(null);
    setSelected(null);
    fetchNotes();
  };

  const filtered = notes.filter(n =>
    n.name.toLowerCase().includes(search.toLowerCase()) ||
    n.body?.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div>
    {editorType ? (
      <>
        <div className={styles.editorHeader}>
          <button className={styles.btnBack} onClick={() => { setEditorType(null); setSelected(null); }}>← Back</button>
          <h1 className={styles.title}>{selected ? 'Edit note' : 'New note'}</h1>
        </div>

        {editorType === 'text' && (
          <NoteEditor selected={selected} onSave={handleSave} onCancel={() => { setEditorType(null); setSelected(null); }} />
        )}
        {editorType === 'image' && (
          <ImageNoteEditor onSave={handleSave} onCancel={() => { setEditorType(null); setSelected(null); }} />
        )}
      </>
    ) : (
      <>
        <div className={styles.header}>
          <h1 className={styles.title}>Carnetel</h1>
          <div className={styles.actions}>
            <ExportButton />
            <button className={styles.btnNew} onClick={() => setEditorType('text')}>+ Text</button>
            <button className={styles.btnNew} onClick={() => setEditorType('image')}>+ Image</button>
          </div>
        </div>

        <div className={styles.searchBar}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="#aaa" strokeWidth="1.2"/>
            <path d="M9.5 9.5L12 12" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.grid}>
          {filtered.map(note => (
            <div key={note.id} className={styles.card}>
              {note.type === 'image' && note.imageUrl && (
                <img src={note.imageUrl} alt={note.name} className={styles.cardImage} />
              )}
              <div className={styles.cardTitle}>{note.name}</div>
              {note.type === 'text' && (
                <div className={styles.cardBody}>{note.body}</div>
              )}
              <div className={styles.cardFooter}>
                <span className={styles.cardDate}>
                  {new Date(note.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
                <div className={styles.cardActions}>
                  {note.type === 'text' && (
                    <button className={styles.iconBtn} onClick={() => handleEdit(note)} title="Edit">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 9.5L9 2.5l1.5 1.5-7 7H2v-1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                  <button className={styles.iconBtn} onClick={() => handleDelete(note.id)} title="Delete">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 3.5h9M5 3.5V2h3v1.5M3.5 3.5v7a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);
}