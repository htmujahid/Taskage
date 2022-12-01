import React, { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import Reading from '../components/Readings/index'

import { requirePageAuth } from '../utils/requireAuth'

export default function readings() {
  useEffect(() => {
    requirePageAuth()
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Taskage - Readings</title>
      </Head>
      <Navbar />
      <Reading />
    </React.Fragment>  
    )
}
