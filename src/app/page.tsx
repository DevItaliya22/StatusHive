"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      {session ? (
        <>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <button onClick={()=>router.push("/auth/signin")}>Sign In </button>
      )}
      {Array.from({ length: 20 }).map((_, i) => <><br /></>)}
      <h1 className="text-5xl">This is landing page content</h1>
    </div>
  );
}
