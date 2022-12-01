import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

import { useSession, signOut } from 'next-auth/react'

function Navbar() {
    const router = useRouter()
    const path = router.pathname
    
    const { data: session, status } = useSession()

    const navbarList = [
        {
            name: 'Todos',
            path: '/todos'
        },
        {
            name: 'Scheduler',
            path: '/scheduler'
        },
        {
            name: 'Goals',
            path: '/goals'
        },
        {
            name: 'Habits',
            path: '/habits'
        },
        {
            name: 'Notes',
            path: '/notes'
        },
        {
            name: 'Readings',
            path: '/readings'
        },
    ]


    function signoutHandler() {
        signOut()
    }

  return (
    <nav>
        <div className="border-gray-200 ">
            <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                <Link href="/" className="flex items-center">
                    <img src="/assets/icons/logo-black.svg" className="h-5 mr-3 opacity-50" alt="Flowbite Logo" />
                </Link>
                { status !== 'loading' && !session && (
                    <div className="flex items-center gap-4">
                        <Link href="/auth/signup" className="inline-block px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-gray-100 duration-100 hover:bg-opacity-90 ">Get Started</Link>
                        <Link href="/auth/login" className="inline-block text-sm font-medium text-blue-600 hover:opacity-90">Login</Link>
                    </div>
                )}
                { status !== 'loading' && session && (
                    <div className='flex items-center gap-4'>
                        <h6 className="text-gray-900">{session.user.email.split('@')[0]}</h6>
                        <button className="inline-block text-sm font-medium text-blue-600 hover:opacity-90" onClick={signoutHandler}>Sign Out</button>
                    </div>
                )}
            </div>
        </div>
        <div className="border shadow">
            <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
                <div className="flex items-center">
                    <ul className="flex flex-row mt-0 mr-6 space-x-8 font-medium overflow-x-auto hide-scrollbar">
                        {navbarList.map(item => (
                            <li key={item.path}>
                                <Link href={item.path} className={`text-gray-900 ${item.path === path? 'font-semibold':'hover:underline'}`}>{item.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar