'use client'; 

import Link from 'next/link'; 
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import type { Note } from '@/types/note';
import { deleteNote, fetchNotes } from '@/app/api/clientApi'; 
import css from './NoteList.module.css';

interface NoteListProps {
  tag?: string; 
  notes: Note[];
}

export default function NoteList({ tag }: NoteListProps) {
  const queryClient = useQueryClient();

 const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', tag],
  queryFn: () => {
   
    const activeTag = Array.isArray(tag) ? tag[0] : tag;
    
  
    return fetchNotes({ tag: activeTag });
  },
});


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

  if (isLoading) return <div className={css.loader}>Loading notes...</div>;
  if (isError) return <div className={css.error}>Error loading notes.</div>;

  const notes: Note[] = data?.notes || [];

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