import Head from 'next/head'
import { Box, Container, Heading, Flex } from '@chakra-ui/react'
import ProductList from '../components/ProductList'
import Cart from '../components/Cart'

export default function Home() {
  return (
    <Box>
      <Head>
        <title>Next.js E-commerce</title>
        <meta name="description" content="Next.js E-commerce site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="2xl" mb={8} textAlign="center">Welcome to our E-commerce Store</Heading>
        <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
          <Box flex={3}>
            <ProductList />
          </Box>
          <Box flex={1}>
            <Cart />
          </Box>
        </Flex>
      </Container>

      <Box as="footer" textAlign="center" py={4} bg="gray.100">
        <p>© 2023 Next.js E-commerce</p>
      </Box>
    </Box>
  )
}
