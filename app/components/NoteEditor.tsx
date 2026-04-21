'use client';

import { useEffect, useState } from 'react';
import styles from './NoteEditor.module.css';

type Note = { id: number; name: string; body: string };

export default function NoteEditor({
  selected,
  onSave,
  onCancel,
}: {
  selected: Note | null;
  onSave: () => void;
  onCancel: () => void;
}) {
    const [name, setName] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        const load = async () => {
            setName(selected ? selected.name : '');
            setBody(selected ? selected.body : '');
        };
        load();
    }, [selected]);
    

    const handleSubmit = async () => {
        if (!name.trim()) return;
        if (selected) {
        await fetch(`/api/notes/${selected.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ name, body }),
            headers: { 'Content-Type': 'application/json' },
        });
        } else {
        await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify({ name, body }),
            headers: { 'Content-Type': 'application/json' },
        });
        }
        onSave();
    };

    return (
        <div className={styles.editor}>
        <input
            className={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Note title"
        />
        <textarea
            className={styles.textarea}
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write something..."
            rows={4}
        />
        <div className={styles.editorActions}>
            <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
            <button className={styles.btnSave} onClick={handleSubmit}>
            {selected ? 'Update' : 'Create'}
            </button>
        </div>
        </div>
    );
}