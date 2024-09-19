"use client"
import React, { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { useApi } from '@/hooks/useApi'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null)
  const { data: session, status, update } = useSession()
  const {get}=useApi()

  const fetchSession = async () => {
    const session = await getSession()
    console.log(session?.user?.email,'email')
  
    if(status==='authenticated'){
      const userInfo=await get('https://bitter-quokka-letzbattle-e9e73964.koyeb.app/api/user')
      setUserInfo(userInfo)
    }
  
  }

  useEffect(() => {
    fetchSession()
  }, [session])

  return (
    <>
      <div>{userInfo ? JSON.stringify(userInfo) : "Loading..."}</div>
    </>
  )
}

export default Profile
