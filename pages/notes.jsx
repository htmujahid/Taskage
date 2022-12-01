import React, { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import Note from '../components/Notes/index'

import { requirePageAuth } from '../utils/requireAuth'
export default function notes() {
  useEffect(() => {
    requirePageAuth()
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Taskage - Notes</title>
      </Head>
      <Navbar />
      <Note />
    </React.Fragment>
  )
}
