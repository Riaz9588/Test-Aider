import Link from 'next/link'

const products = [
  { id: 1, name: 'Product 1', price: 9.99 },
  { id: 2, name: 'Product 2', price: 19.99 },
  { id: 3, name: 'Product 3', price: 29.99 },
]

export default function ProductList() {
  return (
    <div>
      <h2>Our Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>
              <a>{product.name} - ${product.price}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
