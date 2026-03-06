'use client';

import css from './NotePreview.module.css';
import { useParams, useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal'; 
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface NotePreviewProps {
  id?: string;
}

export const NotePreview = ({ id: propId }: NotePreviewProps) => {
  const params = useParams();
  const router = useRouter();
  const id = propId || (params?.id as string);

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClose = () => router.back();

  
  const handleOpenModal = () => {
    setModalOpen(true); 
  };

  const handleModalClose = () => {
    setModalOpen(false); 
  };

 
  const mutation = useMutation({
    mutationFn: () => fetch(`/api/notes/${id}`, { method: 'DELETE' }), 
    onSuccess: () => {
      router.push('/notes'); 
    },
  });

  const handleDelete = () => {
    mutation.mutate(); 
  };

  return (
    <div className={css.container} onClick={handleOpenModal}> 
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {note && (
        <>
          <h2 className={css.title}>{note.title}</h2>
          <div className={css.content}>{note.content}</div>
          <div className={css.meta}>
            <span className={css.tag}>#{note.tag}</span>
            <time className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </time>
          </div>
          <button className={css.backBtn} onClick={handleClose}>
            Close
          </button>
          <button className={css.deleteBtn} onClick={handleDelete}> 
            Delete Note
          </button>
        </>
      )}
      
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <div className={css.container}>
            <h2>{note?.title}</h2>
            <div>{note?.content}</div>
            <button onClick={handleModalClose}>Close Modal</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NotePreview;