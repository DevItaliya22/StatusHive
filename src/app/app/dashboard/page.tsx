"use client";
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
// https://app.statushive.devitaliya.me/dashboard page 
import { useState } from 'react';

export default function MyComponent() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://statushive.devitaliya.me/api/edge', {
        method: 'GET',
        headers: {
          'X-Vercel-Location': 'sfo1', 
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Make Request'}
      </button>

      {error && <p>{error}</p>}
      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
