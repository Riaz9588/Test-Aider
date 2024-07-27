import { Box, Button, Heading, Text, VStack, HStack } from '@chakra-ui/react'
import useCartStore from '../store/cartStore'

export default function Cart() {
  const { items, removeItem, clearCart } = useCartStore()

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>Your Cart</Heading>
      {items.length === 0 ? (
        <Text>Your cart is empty</Text>
      ) : (
        <VStack align="stretch" spacing={4}>
          {items.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Text>{item.title} (x{item.quantity})</Text>
              <HStack>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                <Button size="sm" colorScheme="red" onClick={() => removeItem(item.id)}>Remove</Button>
              </HStack>
            </HStack>
          ))}
          <HStack justify="space-between">
            <Text fontWeight="bold">Total:</Text>
            <Text fontWeight="bold">${total.toFixed(2)}</Text>
          </HStack>
          <Button colorScheme="green">Checkout</Button>
          <Button colorScheme="red" onClick={clearCart}>Clear Cart</Button>
        </VStack>
      )}
    </Box>
  )
}
