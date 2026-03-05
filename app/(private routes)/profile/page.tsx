import { Metadata } from 'next';
import Image from 'next/image';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getMeServer } from '@/lib/api/serverApi';

export const metadata: Metadata = {
title: 'Profile Page',
description: 'User profile page description',
};

export default async function Profile() {
const user = await getMeServer();
if (!user) {
return (

<main className={css.mainContent}>
<div className={css.profileCard}>
<p>Користувача не знайдено</p>
<Link href="/sign-in" className={css.editProfileButton}>Увійти</Link>
</div>
</main>
);
}

return (

<main className={css.mainContent}>
<div className={css.profileCard}>
<div className={css.header}>
<h1 className={css.formTitle}>Profile Page</h1>
<Link href="/profile/edit" className={css.editProfileButton}>
Edit Profile
</Link>
</div>

<div className={css.avatarWrapper}>
<Image
src={user.avatar || '/default-avatar.png'}
alt="User Avatar"
width={120}
height={120}
className={css.avatar}
priority
/>
</div>

<div className={css.profileInfo}>
<p>
Name: {user.username}
Email: {user.email}
</p>
</div>
</div>
</main>
);
}