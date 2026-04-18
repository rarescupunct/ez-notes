'use client';

import { useEffect, useState } from "react";
import NoteEditor from "./NoteEditor";


type Note = {id: number, title: string, body: string};

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selected, setSelected] = useState<Note | null>(null);

    const fetchNotes = async() => {
        const res = await fetch('/api/notes');
        setNotes(await res.json());
    }

    useEffect(() => {
        async function load(){
            await fetchNotes();
        }
        load();
    }, []);

    const handleDelete = async(id: number)=>{
        await fetch('/api/notes/'+id, {method: 'DELETE'});
        fetchNotes();
    };

    return (
        <div>
            <NoteEditor note={lilNote} onSave={() => {setSelected(null); fetchNotes();}}/>
                {
                    notes.map(note => (
                        <div key={note.id}>
                            <h3>{note.title}</h3>
                            <p>{note.body}</p>
                            <button onClick={() => setSelected(note)}>Edit</button>
                            <button onClick={() => handleDelete(note.id)}>Delete</button>
                        </div>
                    ))
                }
        </div>
    );
}