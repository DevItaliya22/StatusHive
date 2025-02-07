"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React from 'react'
// https://app.statushive.devitaliya.me/ 
function Home() {
    const router = useRouter();
    const {data:session} = useSession();
  return (
    <div>
        {session && session.user ? <>Welcome {session?.user.email}</> : <>Please sign in</>}

        <button onClick={()=>router.push("/setting")}>Setting page </button>
    </div>
  )
}

export default Home