import { Box, Button, Center, Container, Divider, Flex, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Navbar() {

  const Router = useRouter()
  return (
    <Flex h='10vh' justifyContent='space-between' alignItems='center'>
      <Text
        fontSize='2xl'
        fontWeight='bold'
        color='white'
        fontFamily='Showcard Gothic'>
      E - quest
      </Text>
      <Flex>
        <HStack mr='10' spacing='8'>
          <Box color='white'>Home</Box>
          <Box color='white'>About</Box>
          <Link color='white' href='#pricing'>Pricing</Link>
          <Box color='white'>Contact</Box>
          {/* <Link onClick={() => Router.push('./Dashboard')}>Dashboard</Link> */}
          <HStack>
            <Box>
              <Button
                onClick={() => Router.push('/Login')}
                bg='none'
                fontWeight='normal'
                color='white'
                _hover={{
                  bg: 'white',
                  color: '#161b45',
                  border: 'none'
                }}
              >
                Sign in
              </Button>
            </Box>
            <Center height='30px'>
              <Divider borderColor='gray.300' orientation='vertical' />
            </Center>
            <Box>
              <Button
                onClick={() => Router.push('/')}
                bg='none'
                fontWeight='normal'
                color='white'
                _hover={{
                  bg: 'white',
                  color: '#161b45',
                  border: 'none'
                }}
              >
                Sign up
              </Button>
            </Box>
          </HStack>
          {' '}
        </HStack>
      </Flex>
    </Flex>
  )
}
