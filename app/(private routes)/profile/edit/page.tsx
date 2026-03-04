"use client"; import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { updateMe } from '@/app/api/clientApi';
import styles from './EditProfilePage.module.css';

export default function EditProfilePage() {
    const router = useRouter();
    
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const [userName, setUserName] = useState(user?.username || '');
    const [photoUrl, setPhotoUrl] = useState(user?.avatar || '');
    const [isLoading, setIsLoading] = useState(false);
    if (!user) return <div className={styles.loading}>Loading...</div>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const updatedUser = await updateMe({ userName: userName, photoUrl });
            setUser(updatedUser);
            router.push('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

return (

    <div className={styles.container}>
        <h1 className={styles.title}>Edit Profile</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <label>Username</label>
                <input className={styles.input} value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className={styles.field}>
                <label>Photo URL</label>
                <input className={styles.input} value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
            </div>
            <div className={styles.buttons}>
               <button type="submit" disabled={isLoading} className={styles.saveBtn}> {isLoading ? 'Saving...' : 'Save'} </button>
                <button type="button" className={styles.cancelBtn} onClick={() => router.back()}>Cancel</button>
            </div> </form> </div>);
}