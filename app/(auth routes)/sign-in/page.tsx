
'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; import { login as loginApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';
import styles from './SignInPage.module.css';

type SignInFormData = Partial<User> & { password?: string };

export default function SignInPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>();
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const onSubmit = async (data: SignInFormData) => {
        try {
            const response = await loginApi({
                email: data.email || '',
                password: data.password || '',
            });

            setUser(response.user);
            router.push('/profile');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Невірний email або пароль');
        }
    };
    return (
        <main className={styles.mainContent}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={styles.formTitle}>Вхід</h1>

             <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
                    <input id="email" type="email" className={styles.input} {...register('email', {
                        required: 'Email обов\'язковий',
                        
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Некоректний формат email'
                        }
                    })} name="email" placeholder="email@example.com" />
            {errors.email && <span className={styles.error}>{String(errors.email.message)}</span>}
            </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Пароль</label>
                    <input id="password" type="password" className={styles.input} {...register('password', { required: 'Введіть пароль' })} name="password"
                        placeholder="Введіть пароль" />
            {errors.password && <span className={styles.error}>{String(errors.password.message)}</span>}
            </div>

                <div className={styles.actions}>
                    <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                        {isSubmitting ? 'Вхід...' : 'Увійти'}
                    </button>
                </div>

                <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px' }}>
                    Немає акаунту? <Link href="/sign-up" style={{ color: '#0d6efd', fontWeight: '500' }}>Зареєструватися</Link>
                </p>
            </form>
        </main>
    );
}