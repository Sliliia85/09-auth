import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { User } from '@/types/user';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const serverInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


export const checkSession = async (): Promise<AxiosResponse<User>> => {
const cookieStore = await cookies();
const accessToken = cookieStore.get('accessToken')?.value;
const refreshToken = cookieStore.get('refreshToken')?.value;

const response = await axios.get(`${API_URL}/auth/session`, {
headers: {
Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
},
});

return response;
};

export const refreshSession = async (): Promise<boolean> => {
try {
const cookieStore = await cookies();
const refreshToken = cookieStore.get('refreshToken')?.value;
if (!refreshToken) return false;

const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, {
headers: { Cookie: `refreshToken=${refreshToken}` }
});

if (data.accessToken) {
cookieStore.set('accessToken', data.accessToken, {
httpOnly: true,
secure: true,
path: '/'
});
return true;
}

return false;
} catch (error) {
    console.error('Error refreshing session:', error);
return false;
}
};


serverInstance.interceptors.request.use(async (config) => {
try {
const cookieStore = await cookies();
const accessToken = cookieStore.get('accessToken')?.value;
if (accessToken) {
config.headers.Authorization = `Bearer ${accessToken}`;
}
return config;
} catch (error) {
console.error('Error attaching token:', error);
return config;
}
});



export const getMeServer = async (): Promise<User | null> => {
try {
const { data } = await serverInstance.get<User>('/users/me');
return data;
} catch (error) {
    console.error('Error fetching user:', error);
return null;
}
};

export const fetchNotesServer = async (params: Record<string, string | number | undefined>): Promise<{
notes: Note[]; totalPages: number
}> => {
const { data } = await serverInstance.get('/notes', { params });
return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
const { data } = await serverInstance.get<Note>(`/notes/${id}`);
return data;
    };
