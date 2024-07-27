import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react'
import axios from 'axios'
import useCartStore from '../../store/cartStore'

export default function Product() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
          setProduct(response.data)
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }
      fetchProduct()
    }
  }, [id])

  if (!product) return <Box>Loading...</Box>

  return (
    <Box maxWidth="800px" margin="auto" p={4}>
      <Heading as="h1" size="xl" mb={4}>{product.title}</Heading>
      <Image src={product.image} alt={product.title} maxHeight="400px" objectFit="contain" mb={4} />
      <Text fontSize="xl" fontWeight="bold" mb={2}>${product.price.toFixed(2)}</Text>
      <Text mb={4}>{product.description}</Text>
      <Button colorScheme="blue" onClick={() => addItem(product)}>Add to Cart</Button>
    </Box>
  )
}
