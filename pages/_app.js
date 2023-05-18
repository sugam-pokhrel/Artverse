
import Navbar from '../compos/Navbar'
import '../styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
    <div data-theme="dark">
      <Navbar />
      <Component {...pageProps} />
    </div>

  )
}
