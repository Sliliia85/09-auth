'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import css from './Notes.module.css'; 
import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

const NOTES_PER_PAGE = 12;
interface NotesClientProps {
  activeTag: string;
}

export default function NotesClient({ activeTag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
 

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

 const { data, isLoading, isError } = useQuery({ queryKey: ['notes', activeTag, currentPage, debouncedSearchQuery], queryFn: () => fetchNotes({ page: currentPage, perPage: NOTES_PER_PAGE, search: debouncedSearchQuery, tag: activeTag,  }), placeholderData: (previousData) => previousData, staleTime: 5000, });
console.log(data)
  const notes = data?.notes || []; 
  const totalPages = data?.totalPages || 0;
 

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  return (
    <main className={css.app}>
      <div className={css.container}>
        <Toaster position="top-right" />
        
        <header className={css.toolbar}> <SearchBox onSearch={handleSearch} value={searchQuery} />

{totalPages > 1 && ( <Pagination pageCount={totalPages} onPageChange={handlePageChange} currentPage={currentPage} /> )}

 <Link href="/notes/action/create" className={css.button}>Create note +</Link>

</header>
        
        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Error fetching notes.</p>}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {notes.length === 0 && !isLoading && !isError && (
          <p>No notes found.</p>
        )}
        
      
      </div>
    </main>
  );
}