import React, { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import Goal from '../components/Goals/index'
import { requirePageAuth } from '../utils/requireAuth'
export default function goals() {
  useEffect(() => {
    requirePageAuth()
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Taskage - Goals</title>
      </Head>
      <Navbar />
      <Goal />
    </React.Fragment>  )
}
