import { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
    title: 'Create New Note | NoteHub',
    description: 'Create and save your new thoughts and ideas.',
    openGraph: {
        title: 'Create New Note | NoteHub',
        description: 'A dedicated space to capture your ideas.',
        url: 'https://vercel.com/liliia-simbukhovas-projects/08-zustand',
        siteName: 'NoteHub',
        images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }], type: 'website',
    },
};

export default function CreateNotePage() {
    return (

        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>);
}