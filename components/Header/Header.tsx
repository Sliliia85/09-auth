'use client'; 
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './Header.module.css';

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home" className={css.headerLink}>NoteHub</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink} style={{ color: pathname === '/' ? '#ddd' : 'white' }}>Home</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/all" className={css.navigationLink} style={{ color: pathname.startsWith('/notes') ? '#ddd' : 'white' }}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};