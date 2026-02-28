import css from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p suppressHydrationWarning>
          © {currentYear} NoteHub. All rights reserved.
        </p>
        <div className={css.wrap}>
          <p>Developer: Світлана</p>
          <p>
            Contact us:{' '}
            <a href="mailto:student@notehub.app" className={css.link}>
              student@notehub.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};