'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetails() {
    const params = useParams();
  const id = params?.id as string; 

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });


  if (isLoading) return <p className={css.status}>Loading, please wait...</p>;
  
  
  if (error || !note) return <p className={css.status}>Something went wrong.</p>;

  return (
      <main className={css.main}>
          <button className={css.backBtn} onClick={() => window.history.back()}> ← Back to notes </button>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}