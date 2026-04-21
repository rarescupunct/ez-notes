'use client';

import styles from './ExportButton.module.css';

type notes = {id: number, name: string, body: string};

export default function ExportButton() {
  const handleExport = async (format: 'json' | 'md') => {
    const res = await fetch('/api/notes');
    const notes = await res.json();
    let content: string, filename: string, type: string;

    if (format === 'json') {
      content = JSON.stringify(notes, null, 2);
      filename = 'notes.json';
      type = 'application/json';
    } else {
      content = notes.map((n: notes) => `# ${n.name}\n\n${n.body}`).join('\n\n---\n\n');
      filename = 'notes.md';
      type = 'text/markdown';
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={() => handleExport('json')}>Export JSON</button>
      <button className={styles.btn} onClick={() => handleExport('md')}>Export MD</button>
    </div>
  );
}