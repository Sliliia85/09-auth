import css from './not-found.module.css';
import { Metadata } from 'next';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}

export const metadata: Metadata = {
  title: '404 - Page Not Found | Notes App',
  description: 'Sorry, but the page you are looking for does not exist on Notes App.',
  openGraph: {
    title: '404 - Not Found',
    description: 'The page you are looking for does not exist.',  
    url : '',
    siteName: 'Notes App',
    images: [ 
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Notes App Open Graph Image',
      },
    ],
    type: 'website',
  },
};