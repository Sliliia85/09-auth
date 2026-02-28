import css from './page.module.css';

export default function HomePage() {
  return (
    <main className={css.main}>
      <section>
        <div className={css.container}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          
          <div className={css.content}>
            <p className={css.description}>
              NoteHub is a simple and efficient application designed for managing personal notes. 
              It helps keep your thoughts organized and accessible in one place.
            </p>
            <p className={css.description}>
              The app provides a clean interface for writing, editing, and browsing notes.
              Stay productive and never lose an important idea again.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}