import Head from 'next/head'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Next.js E-commerce</title>
        <meta name="description" content="Next.js E-commerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to our Amazing E-commerce Store</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <ProductList />
          </div>
          <div className="md:w-1/4">
            <Cart />
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 text-center py-4">
        <p>© 2023 Next.js E-commerce</p>
      </footer>
    </div>
  )
}
