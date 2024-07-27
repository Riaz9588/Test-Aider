import '../styles/globals.css'
import Navigation from '../components/Navigation'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </Head>
      <Navigation />
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </div>
  )
}

export default MyApp
