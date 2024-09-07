"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

const Login = () => {
    const login=(provider:'google')=>{
        signIn(provider,{
            callbackUrl:'/'
        })

    }
  return (

    <div>
        <button onClick={()=>login("google")}>Login with google</button>
        
    </div>
  )
}

export default Login