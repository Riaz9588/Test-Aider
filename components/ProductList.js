import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Box, Grid, Heading, Button } from '@chakra-ui/react'
import axios from 'axios'
import useCartStore from '../store/cartStore'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  return (
    <Box>
      <Heading as="h2" size="xl" mb={6}>Our Products</Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {products.map((product) => (
          <Box key={product.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Link href={`/products/${product.id}`} passHref>
              <Box as="a" fontWeight="semibold" fontSize="lg" mb={2}>
                {product.title}
              </Box>
            </Link>
            <Box>${product.price.toFixed(2)}</Box>
            <Button colorScheme="blue" mt={2} onClick={() => addItem(product)}>
              Add to Cart
            </Button>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
