'use client';

import { useState } from 'react';
import styles from './ImageNoteEditor.module.css';

export default function ImageNoteEditor({
  onSave,
  onCancel,
}: {
  onSave: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!name.trim() || !file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    await fetch('/api/notes/upload', {
      method: 'POST',
      body: formData,
    });

    setLoading(false);
    onSave();
  };

  return (
    <div className={styles.editor}>
      <input
        className={styles.input}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Image note title"
      />

      <label className={styles.uploadArea}>
        {preview ? (
          <img src={preview} alt="preview" className={styles.preview} />
        ) : (
          <div className={styles.uploadPlaceholder}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V8M8 12l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Tap to upload photo</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          className={styles.fileInput}
        />
      </label>

      <div className={styles.editorActions}>
        <button className={styles.btnCancel} onClick={onCancel}>Cancel</button>
        <button
          className={styles.btnSave}
          onClick={handleSubmit}
          disabled={loading || !file || !name.trim()}
        >
          {loading ? 'Uploading...' : 'Save'}
        </button>
      </div>
    </div>
  );
}