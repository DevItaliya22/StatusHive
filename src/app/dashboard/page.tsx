// /app/dashboard/page.tsx
"use client";

import { useSession } from "next-auth/react"; // Use useSession for client-side session fetching
import { useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession(); // Get session data using useSession
  const [inputValue, setInputValue] = useState<string>('');
  const [statusPage, setStatusPage] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (!session || !session.user?.email) {
      setError("You need to be logged in to add a domain.");
      return;
    }

    try {
      const response = await fetch('/api/health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputValue }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusPage(data);
        setError('');
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to add domain');
    }
  };

  // Session loading state
  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="text-5xl">This is dashboard page content</h1>
      {session ? (
        <h1 className="text-2xl text-white">
          Welcome {JSON.stringify(session.user, null, 2)}
        </h1>
      ) : (
        <h1 className="text-2xl text-red-500">Not logged in</h1>
      )}

      <input 
        type="text" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
        placeholder="Enter subdomain"
      />
      <button onClick={handleSubmit}>Add domain</button>

      {statusPage && (
        <div>
          <h2>Status Page Created:</h2>
          <pre>{JSON.stringify(statusPage, null, 2)}</pre>
        </div>
      )}

      {error && <h2 className="text-red-500">{error}</h2>}
    </div>
  );
}
