'use client'; 

import Link from 'next/link'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { Note } from '@/types/note';
import { deleteNote } from '@/lib/api/clientApi'; 
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success('Note deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error: Error) => {
      toast.error(`Error deleting note: ${error.message}`);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(id);
    }
  };
if (!notes || notes.length === 0) {
return <div className={css.empty}>No notes found.</div>;
}


  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <div>
            <h3 className={css.title}>{note.title}</h3>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              
              <Link 
                href={`/notes/${note.id}`} 
                className={css.link}
                scroll={false} 
              >
                View details
              </Link>
            </div>
          </div>
          <button
            className={css.button}
            onClick={() => handleDelete(note.id)}
            disabled={deleteNoteMutation.isPending}
            aria-label="Delete note"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
}