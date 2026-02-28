import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import ModalWrapper from './ModalWrapper';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}
 export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { id } = await params;
   const note = await fetchNoteById(id);

const title = note.title; const description = note.content.slice(0, 150);
   return {
     title,
     description, openGraph: {
       title,
       description,
       url: `https://notes-app.com/notes/${id}`,
       siteName: 'Notes App',
       images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
       type: 'article',
     },
   };
 }

 
export default async function NotePage({ params }: Props) {
  const { id } = await params;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (<HydrationBoundary state={dehydrate(queryClient)}>
    <ModalWrapper>
      <NoteDetailsClient />
    </ModalWrapper>
  </HydrationBoundary>);
}