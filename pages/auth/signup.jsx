import React from 'react'
import Head from 'next/head'

import SignupComponent from '../../components/Authentication/Signup'

function signup() {
  return (
    <React.Fragment>
        <Head>
            <title>Taskage - Signup</title>
        </Head>
        <SignupComponent />
    </React.Fragment>
  )
}

export default signup