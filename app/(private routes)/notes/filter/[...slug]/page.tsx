import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? '' : slug[0];
  const title = tag ? `Notes tagged with "${tag}"` : 'All Notes';
  const description = tag ? `A collection of notes tagged with "${tag}".` : 'A collection of all notes.';
  return {
    title, description, openGraph: {
      title,
      description,
      url: `https://notes-app.com/notes/filter/${slug.join('/')}`,
      images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
    },
  };
}



export default async function FilteredNotesPage({ params }: Props) { const { slug } = await params;

const tag = slug[0] === 'all' ? '' : slug[0];

const queryClient = new QueryClient();

await queryClient.prefetchQuery({ queryKey: ['notes', tag, 1, ''], queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag: tag }) });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient activeTag={tag} />
        </HydrationBoundary>);
}




