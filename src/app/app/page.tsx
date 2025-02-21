"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
// https://app.statushive.devitaliya.me/ 
function Home() {
    const router = useRouter();
    const {data:session} = useSession();
    useEffect(()=>{
      router.push("/monitors")
    })
  return (
    <div>
        {session && session.user ? <>Welcome {session?.user.email}</> : <>Please sign in</>}
        <br />
    </div>
  )
}

export default Home