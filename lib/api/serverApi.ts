import { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { nextServer } from './api';

const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const cookiesArray: string[] = [];

  if (accessToken) {
    cookiesArray.push(`accessToken=${accessToken}`);
  }

  if (refreshToken) {
    cookiesArray.push(`refreshToken=${refreshToken}`);
  }

  return cookiesArray.join('; ');
};

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieHeader = await getCookieHeader();

  return nextServer.get<User>('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    },
  });
};

export const getMeServer = async (): Promise<User | null> => {
  try {
    const cookieHeader = await getCookieHeader();

    const { data } = await nextServer.get<User>('/users/me', {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return data;
  } catch {
    return null;
  }
};

export const fetchNotesServer = async (
  params: Record<string, string | number | undefined>
): Promise<{ notes: Note[]; totalPages: number }> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await nextServer.get<{ notes: Note[]; totalPages: number }>(
    '/notes',
    {
      params,
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  return data;
};

export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });

  return data;
};