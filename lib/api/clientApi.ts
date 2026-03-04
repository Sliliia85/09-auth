import { nextServer } from './api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export interface AuthResponse {
    user: User;
    token?: string;
}

export interface UpdateUserRequest {
    userName?: string;
    photoUrl?: string;
}
    
export const register = async (payload: Partial<User>): Promise<AuthResponse> => {
    const { data } = await nextServer.post<AuthResponse>('/auth/register',
        {
            username: payload.username,
            email: payload.email,
            password: payload.password,
        });
    return data;
};

export const login = async (payload: Partial<User>): Promise<AuthResponse> => {
    const { data } = await nextServer.post<AuthResponse>('/auth/login', payload);
    return data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<User | null> => {
    const { data } = await nextServer.get<User>('/auth/session');
    return data;
};

export const fetchNotes = async (params: Record<string, string | number | undefined>): Promise<{ notes: Note[]; totalPages: number }> => {
    const { data } = await nextServer.get('/notes', { params });
    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
};

export const createNote = async (payload: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const { data } = await nextServer.post<Note>('/notes', payload);
    return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);
    return data;
};

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
};

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
    const { data } = await nextServer.patch<User>('/users/me', payload);
    return data;
};
