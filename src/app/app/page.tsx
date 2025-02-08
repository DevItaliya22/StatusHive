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
        <br />
        <button onClick={()=>router.push("/setting")} className='border-2 border-black p-5 dark:text-white dark:bg-black'>Setting page </button>
    </div>
  )
}

export default Home