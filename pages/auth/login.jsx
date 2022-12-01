import React from 'react'
import Head from 'next/head'
import LoginComponent from '../../components/Authentication/index'

import {useSession, getSession} from 'next-auth/react'

import { useRouter } from 'next/router'

export default function login() {

  const { data: session, status } = useSession()

  const router = useRouter()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    router.push('/')    
  }

  return (
    <React.Fragment>
      <Head>
        <title>Taskage - Login</title>
      </Head>
      <LoginComponent />
    </React.Fragment>  
  )
}
