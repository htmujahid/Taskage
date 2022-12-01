import React, { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import Scheduler from '../components/Scheduler/index'
import { requirePageAuth } from '../utils/requireAuth'

export default function scheduler() {
  useEffect(() => {
    requirePageAuth()
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Taskage - Scheduler</title>
      </Head>
        <Navbar />
        <Scheduler />
    </React.Fragment>  )
}
