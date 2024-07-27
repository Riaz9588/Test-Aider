import Head from 'next/head'
import ProductList from '../components/ProductList'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next.js E-commerce</title>
        <meta name="description" content="Next.js E-commerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to our E-commerce Store</h1>
        <ProductList />
      </main>

      <footer>
        <p>© 2023 Next.js E-commerce</p>
      </footer>
    </div>
  )
}
