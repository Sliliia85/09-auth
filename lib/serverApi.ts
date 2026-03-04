import axios from 'axios'; import { cookies } from 'next/headers'; import { Note } from '@/types/note'; import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverInstance = axios.create({ baseURL: API_URL, withCredentials: true, });

serverInstance.interceptors.request.use(async (config) => {
    try {
        const cookieStore = await cookies(); const session = cookieStore.get('session');
        if (session) { config.headers.Cookie = `session=${session.value}`; }
        return config;
    } catch (error) {
        console.error('Error setting session cookie:', error);
        return config;
    }
});

export const getMeServer = async (): Promise<User | null> => {
    try {
        const { data } = await serverInstance.get<User>('/users/me');
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const fetchNotesServer = async (params: Record<string, string | number | undefined>): Promise<{
    notes: Note[]; totalPages: number
}> => { const { data } = await serverInstance.get('/notes', { params }); return data; };

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
    const { data } = await serverInstance.get<Note>(`/notes/${id}`); return data;
};