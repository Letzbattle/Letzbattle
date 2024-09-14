"use client"
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null)

  const fetchSession = async () => {
    const session = await getSession()
    setUserInfo(session)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  return (
    <>
      <div>{userInfo ? JSON.stringify(userInfo) : "Loading..."}</div>
    </>
  )
}

export default Profile
