import '../styles/globals.css'
import Navigation from '../components/Navigation'

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
