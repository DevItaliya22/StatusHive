"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function DomainPage() {
  const { data: session } = useSession();
  const params = useParams<{ domain: string }>();

  const fetchInfo = async () => {
    // Your async logic here
  };

  return (
    <>
      {session && session.user ? (
        <>Welcome {session?.user.email}</>
      ) : (
        <>Please sign in</>
      )}
      <br />
      {params.domain}
    </>
  );
}
