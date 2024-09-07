import React from 'react'
import { auth } from '../../../../auth'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'

async function Settings() {
    const session= await auth()
    const user=await getUserById('cm0rqfc0r0000p8iv21zwtt6q')
    console.log({user})
  return (<>
    <div>Settings={JSON.stringify(session)}</div>
    <div>{JSON.stringify(user)}</div>
    </>
  )
}

export default Settings