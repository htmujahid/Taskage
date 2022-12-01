import React, { useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import Habit from '../components/Habits/index'
import { requirePageAuth } from '../utils/requireAuth'
export default function habits() {
  useEffect(() => {
    requirePageAuth()
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Taskage - Habits</title>
      </Head>
      <Navbar />
      <Habit />
    </React.Fragment>  )
}
