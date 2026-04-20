'use client';

export default function ExportButton() {
    const handleExport = async (format: 'json'|'md') => {
        const res = await fetch('/api/notes');
        const notes = await res.json();

        let content: string;
        let filename: string;
        let type: string;

        if(format === 'json'){
            content = JSON.stringify(notes, null, 2);
            filename = 'notes.json';
            type = 'application/json';
        } else {
            content = notes.map((note: {name: string, body: string}) => `# ${note.name}\n\n${note.body}`).join('\n\n---\n\n');
            filename = 'notes.md';
            type = 'text/markdown';
        }

        const blob = new Blob([content], {type});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return(
        <div>
            <button onClick={() => handleExport('json')}>Export as JSON</button>
            <button onClick={() => handleExport('md')}>Export as Markdown</button>
        </div>
    );
}