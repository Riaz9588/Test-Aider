import Head from 'next/head'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>Next.js E-commerce</title>
        <meta name="description" content="Next.js E-commerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <ProductList />
          </div>
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <Cart />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© {new Date().getFullYear()} Next.js E-commerce. All rights reserved.</p>
      </footer>
    </div>
  )
}
