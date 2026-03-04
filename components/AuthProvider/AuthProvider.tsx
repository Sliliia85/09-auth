"use client";
import { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { checkSession } from '@/app/api/clientApi';
import { User } from '@/types/user';

interface AuthResponse { user: User; }

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const setUser = useAuthStore((state) => state.setUser);
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const data = await checkSession()as AuthResponse | null;;
                if (data && typeof data === 'object' && 'user' in data) {
                    setUser(data.user);
                     
                } else {
                    clearAuth();
                    
                }
            }
            
            catch (error) {
                clearAuth(); 
                console.error('Error checking session:', error);
        } finally { setIsLoading(false); }
        }; initAuth();
    }, [setUser, clearAuth]);

if (isLoading) return <div>Loading...</div>;

return <>{children}</>; };