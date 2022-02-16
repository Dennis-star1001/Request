import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Button, VStack, Flex, Image, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useToast, Divider, Container } from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-icons/go';
import { AiOutlineArrowLeft, AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup'
import Axios from 'axios'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router';

export default function Login() {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const Router = useRouter()
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required!'),
      password: Yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*.,])(?=.{8,})/,
          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        ),
    }),
    onSubmit: async (values) => {
      await Axios.post('http://localhost:3000/api/user/Login', {
        email: values.email,
        password: values.password,
      })
        .then(async (res) => {
          setLoading(true)
          const loginResponse = res.data
          console.log(loginResponse.token)

          toast({
            title: 'Logged In successfuly!',
            description: 'Redirecting to dashboard ...',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          })

          setCookie(null, 'jwt', loginResponse.token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          })
          Router.push('/Dashboard', undefined, { shallow: true })
        })
        .catch((err) => {
          toast({
            title: `${err.response.data}`,
            description: 'Please try again',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
          })
          setLoading(false)
          return err
        })
      setLoading(false)
    },
  })
  return (
    <Box bg='white' h='100vh' >
     
      <Container maxW='6xl'>
      <Box>
      <Text
      py='10' 
        fontSize='2xl'
        fontWeight='bold'
        color='#161b45'
        fontFamily='Showcard Gothic'>
      E - quest
      </Text>
      </Box>
      <HStack justifyContent='space-between' alignItems='center'  >
        
        {/* <Stack justifyContent='center' alignItems='center' w='50vw' bg='#161b45' h='100%'>
          <Box>
            <Text textAlign='center' color='white' fontSize='3xl' fontWeight='bold'>Get started for free. <br />Connect to the world easily and fast.</Text>
          </Box>
          <Box>
            <Image src='./World.svg' alt='Connected World' w='sm' h='sm' />
          </Box>

        </Stack> */}
        <Box>
          {/* <Button leftIcon={<AiOutlineArrowLeft />} colorScheme='teal' variant='#50c1e4'>Back</Button> */}
          <Flex flexDirection='column' px='10' w='lg'>
            <Text textAlign='left' fontWeight='bold' color='#161b45' fontSize='3xl' py='10'>
              Login
            </Text>
            {/* <Flex my='5' alignItems='center'>
            <Divider />
            <Text pr='2' pl='2'>
              Or
            </Text>
            <Divider my='3' />
          </Flex> */}
            <form onSubmit={loginFormik.handleSubmit}>
              <FormControl>
                <Stack spacing='6'>
                  <FormControl
                    id='email'
                    isInvalid={
                      loginFormik.errors.email && loginFormik.touched.email
                    }>
                    <FormLabel color='gray.500'>Email</FormLabel>
                    <Input
                      id='email'
                      borderColor='gray.400'
                      _focus={{
                        border: ' 1px solid #161b45',
                      }}
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.email}
                    />
                    <FormErrorMessage>{loginFormik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    id='password'
                    borderColor='gray.400'
                    isInvalid={
                      loginFormik.errors.password && loginFormik.touched.password
                    }>
                    <FormLabel color='gray.500'>Password</FormLabel>
                    <Input
                      type='password'
                      _focus={{
                        border: ' 1px solid #161b45',
                      }}
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.password}
                    />
                    <Button
                      colorScheme='blue'
                      float='right'
                      d='flex'
                      variant='link'
                      onClick={() =>
                        Router.push('/forget-password', undefined, {
                          shallow: true,
                        })
                      }>
                      Forgot your password?
                    </Button>
                    <FormErrorMessage>
                      {loginFormik.errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  <Box>
                    <Button
                      fontSize='large'
                      type='submit'
                      bg='#161b45'
                      w='28'
                      onClick={() => Router.push('./Dashboard/dashboard')}
                      color='white'
                      isLoading={loading}
                      _hover={{

                        bg: '#161b45',
                        color: 'white',
                        border: '1px solid #161b45'
                      }}>
                      Login
                    </Button>
                    <Text mt='4' d='flex' alignItems='center'>
                      Don`t have an acount?
                      <Button
                        colorScheme='blue'
                        variant='link'
                        onClick={() => Router.push('/Signup')}
                        ml='2'>
                        Register
                      </Button>
                    </Text>
                  </Box>
                </Stack>
              </FormControl>
            </form>
          </Flex>
        </Box>
        <HStack spacing='14'  position='fixed' top='80' right='40'>
          <Divider height='40' orientation='vertical' borderColor='gray.300' />

          <VStack spacing='5'>
            <Text color='gray.500' fontSize='sm' fontWeight='medium'>Or continue with </Text>
          <HStack spacing='5'>
            <Button><FaLinkedinIn size='20' color='#161b45' /></Button>
            <Button><AiOutlineGoogle  size='20' color='#161b45' /></Button>
            <Button><AiOutlineTwitter  size='20' color='#161b45' /></Button>
          </HStack>
          </VStack>

        </HStack>

      </HStack>
      </Container>
    </Box>
  )
}
