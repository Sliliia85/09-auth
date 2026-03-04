'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {}
      <p>Could not fetch the list of notes. {error.message}</p>
      <button
        onClick={() => reset()}
        style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}
      >
        Try again
      </button>
    </div>
  );
}