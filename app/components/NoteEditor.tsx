'use client';

import { useEffect, useState } from "react";

type Note = {id:number; name:string; body:string};

export default function NoteEditor({selected, onSave}: {selected: Note | null; onSave: () => void}) {
    const [name, setName] = useState('');
    const [body, setBody] = useState('');

    
    useEffect(() => {
        const load = async () => {
            setName(selected ? selected.name : '');
            setBody(selected ? selected.body : '');
        };
        load();
    }, [selected]);
    

    const handleSubmit = async() => {
        if(selected){
            await fetch('/api/notes/${selected.id}',{
                method: 'PATCH',
                body: JSON.stringify({name, body}),
                headers: {'Content-Type': 'application/json'}
            });
        }
        else{
            await fetch('/api/notes',{
                method: 'POST',
                body: JSON.stringify({name, body}),
                headers: {'Content-Type': 'application/json'}
            });
        }
        setName('');
        setBody('');
        onSave();
    };

    return (
        <div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Title"/>
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Body"/>
            <button onClick={handleSubmit}>{selected ? 'Update' : 'Create'}</button>
        </div>
    );
}