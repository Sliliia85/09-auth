
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi'
import NoteModalClient from './NoteModalClient';

interface Props {
    params: Promise<{ id: string }>;
}
export default async function NoteModalPage({ params }: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id], queryFn: () => fetchNoteByIdServer(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteModalClient />
        </HydrationBoundary>);
}