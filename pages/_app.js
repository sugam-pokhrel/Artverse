
import { useState } from 'react'
import Navbar from '../compos/Navbar'
import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [yes, setYes] = useState(false)
  function toggleView() {
    setYes(!yes)
    var all = document.getElementsByTagName('*')
    if (!yes) {
      for (var i = 0, max = all.length; i < max; i++) {
        all[i].style.border = '1px solid rgba(255, 255, 255, 0.244)'
      }
    } else {
      for (var i = 0, max = all.length; i < max; i++) {
        all[i].style.border = 'none'
      }
    }
  }

  return (
    <div data-theme="dark">
      <SessionProvider session={session}>

        <Navbar />
        <Component {...pageProps} />
        {/* <div className='debugCss' onClick={toggleView}>
        +
      </div> */}
      </SessionProvider>
    </div>
  )
}
