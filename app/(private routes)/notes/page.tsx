"use client"; import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';
import { Note } from '@/types/note';

export default function NotesPage() {
    const { data, isLoading, error } = useQuery({ queryKey: ['notes'], queryFn: () => fetchNotes({ page: 1 }) });

    if (isLoading) return <div>Loading notes...</div>;
    if (error) return <div>Error loading notes</div>;

    return (
        <main>
            <h1>Notes</h1>
            <Link href="/notes/create">New Note</Link>
            <div> {data?.notes.map((note: Note) => (<div key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <Link href={`/notes/${note.id}`}>View</Link>
            </div>))}
            </div>
        </main>);
}