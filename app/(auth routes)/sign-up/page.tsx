'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register as registerApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import styles from './SignUpPage.module.css';
import { User } from '@/types/user';

type SignUpFormData = Partial<User> & { password?: string };

export default function SignUpPage() {
const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormData>();
const router = useRouter();
const setUser = useAuthStore((state) => state.setUser);

const onSubmit = async (data: SignUpFormData) => {
try {
const response = await registerApi({
username: data.username || '',
email: data.email || '',
password: data.password || '',
});

setUser(response.user);
router.push('/profile');
} catch (error) {
console.error('Registration failed:', error);
alert('Помилка реєстрації');
}
};

return (

<main className={styles.mainContent}>
<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
<h1 className={styles.formTitle}>Реєстрація</h1>

<div className={styles.formGroup}>
<label htmlFor="username">Імя користувача</label>
<input
id="username"
className={styles.input}
 {...register('username', { required: 'Це поле обов&#39;язкове' })}
 name="username"
placeholder="Введіть ім'я"
/>
{errors.username && <span className={styles.error}>{String(errors.username.message)}</span>}
</div>

<div className={styles.formGroup}>
<label htmlFor="email">Email</label>
<input
id="email"

type="email"
className={styles.input}
{...register('email', {
required: 'Email обов&#39;язковий',
pattern: { value: /^\S+@\S+$/i, message: 'Некоректний формат email' }
})}
 name="email"
placeholder="email@example.com"
/>
{errors.email && <span className={styles.error}>{String(errors.email.message)}</span>}
</div>

<div className={styles.formGroup}>
<label htmlFor="password">Пароль</label>
<input
id="password"
type="password"
className={styles.input}
{...register('password', {
required: 'Пароль обов&#39;язковий',
minLength: { value: 6, message: 'Мінімум 6 символів' }
})}
 name="password"
placeholder="Введіть пароль"
/>
{errors.password && <span className={styles.error}>{String(errors.password.message)}</span>}
</div>

<div className={styles.actions}>
<button type="submit" className={styles.submitButton} disabled={isSubmitting}>
{isSubmitting ? 'Реєстрація...' : 'Створити акаунт'}
</button>
</div>

<p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
Вже маєте профіль? <Link href="/sign-in" style={{ color: '#0d6efd' }}>Увійти</Link>
</p>
</form>
</main>
);
}