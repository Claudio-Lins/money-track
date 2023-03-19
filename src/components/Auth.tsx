"use client"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/navigation'
import React from 'react'

export async function Auth() {
  const router = useRouter()
  const session = await getServerSession(authOptions)

  {!session && 
    router.push('/auth')
  }
  return (
    <div></div>
  )
}
