'use client';

import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal'; 
import { useQuery } from '@tanstack/react-query';

interface NotePreviewProps {
  id?: string;
}

export const NotePreview = ({ id: propId }: NotePreviewProps) => {
  const params = useParams();
  const router = useRouter();
  const id = propId || (params?.id as string);

const { data: note, isLoading, isError } = useQuery({ queryKey: ['note', id], queryFn: () => fetchNoteById(id), enabled: !!id, refetchOnMount: false, });

const handleClose = () => router.back();

return (
  <Modal onClose={handleClose}>
    <div className={css.container}> {isLoading && <div>Loading...</div>} {isError && <div>Error</div>} {note && (<>
      <h2 className={css.title}>{note.title}</h2>
      <div className={css.content}>{note.content}</div>
      <div className={css.meta}>
      <span className={css.tag}>#{note.tag}</span>
      <time className={css.date}> {new Date(note.createdAt).toLocaleDateString()} </time> </div>

      <button className={css.backBtn} onClick={handleClose}>Close</button> </>)} </div>
  </Modal>); };

export default NotePreview;

