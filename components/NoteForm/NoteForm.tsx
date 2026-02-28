'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createNote } from '../../lib/api';

import css from './NoteForm.module.css';
import { useNoteStore } from '@/stores/useNoteStore';
  
interface NoteData {
  title: string;
  content: string;
  tag: 'Personal' | 'Work' | 'Todo' | 'Meeting' | 'Shopping';
} 
export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const createNoteMutation = useMutation({
    mutationFn: createNote, onSuccess: () => {
      toast.success('Note created successfully!');
      queryClient.invalidateQueries({ queryKey: ['notes'] }); clearDraft();
      router.push('/notes/filter/all');
    }, onError: (error: Error) => { toast.error(`Error: ${ error.message }`); },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteData: NoteData = { title: draft.title || '', content: draft.content || '', tag: (draft.tag as NoteData['tag']) || 'Todo', };
    createNoteMutation.mutate(noteData);
  };
    

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}> Title <input className={css.input} name="title" type="text" value={draft.title || ''} onChange={handleChange} required /> </label>
      <label className={css.label}> Content <textarea className={css.textarea} name="content" value={draft.content || ''} onChange={handleChange} required /> </label>
      <label className={css.label}> Tag <select className={css.select} name="tag" value={draft.tag || 'Personal'} onChange={handleChange} required >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Todo">Todo</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      </label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" className={css.cancelButton}>Create Note</button>
        <button type="button" className={css.submitButton} onClick={() => router.back()}>Cancel</button> </div>
    </form>
  );
}