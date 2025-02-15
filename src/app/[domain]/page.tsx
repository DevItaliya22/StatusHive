"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import Navbar from '../../components/Navbar';
import StatusCard from '../../components/StatusCard';

export default function DomainPage() {
  const { data: session } = useSession();
  const params = useParams<{ domain: string }>();

  const statusArray = Array(30).fill(null).map(() => {
    const colors = ['red', 'yellow', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
  });

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        {session && session.user ? (
          <>Welcome {session?.user.email}</>
        ) : (
          <>Please sign in</>
        )}
        <br />
        {params.domain}
        <StatusCard statusArray={statusArray} />
      </div>
    </>
  );
}
