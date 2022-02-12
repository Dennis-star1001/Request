import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Button, VStack, Flex, Image, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useToast, Link, Container, Divider, Heading } from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-icons/go';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useState } from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup'
import Axios from 'axios'
import { setCookie } from 'nookies'
import { Router, useRouter } from 'next/router';
import Navbar from '../Components/Navbar';

export default function Home() {
  const router = useRouter()
  const login = () => router.push('/Login')
  function Feature({ title, image, desc }) {
    return (

      <Flex justifyContent='center'  bg='blue.50' w='full'>
        <HStack justifyContent='space-between' flexDirection={['column', 'row']} w='5xl'>
          <Box>{image}</Box>
          <VStack spacing={['28', '5']} justifyContent='center' alignItems='left' maxW='5xl'>
            <Heading textAlign={['center', 'left']} fontWeight='normal' fontSize={['9xl', '46px']} color='#000F37' maxW={['5xl', 'sm']} >
              {title}
            </Heading>
            <Text fontSize={['7xl', '5xl', '', '3xl', 'xl']} color='#7d7c81' maxW={['5xl', 'xl']}>
              {desc}
            </Text>
            <Button
              color='#000F37'
              h={['40', '12']}
              w={['96', '36']}
              border='1px'
              borderColor='#000F37'
              bg='none'
              fontSize={['7xl', '18px']}
              fontWeight='normal'
              borderRadius='0'
              _hover={{
                bg: '#000F37',
                color: 'white',
                borderColor: 'white'
              }}>
              Open App
            </Button>
          </VStack>
        </HStack>
      </Flex>


    )
  }
  function Feature2({ title, image, desc }) {
    return (

      <Flex justifyContent='center' >
        <HStack justifyContent='space-between' flexDirection={['column', 'row-reverse']} w='5xl'>
          <Box>{image}</Box>
          <VStack spacing={['28', '5']} justifyContent='center' alignItems='left' maxW='5xl'>
            <Heading textAlign={['center', 'left']} fontWeight='normal' fontSize={['9xl', '46px']} color='#000F37' maxW={['5xl', 'sm']}>
              {title}
            </Heading>
            <Text fontSize={['7xl', '5xl', '', '3xl', 'xl']} color='#7d7c81' maxW={['5xl', 'xl']}>
              {desc}
            </Text>
            <Button
              color='#000F37'
              h={['40', '12']}
              w={['96', '36']}
              border='1px'
              borderColor='#000F37'
              bg='none'
              fontSize={['7xl', '18px']}
              fontWeight='normal'
              borderRadius='0'
              _hover={{
                bg: '#000F37',
                color: 'white',
                borderColor: 'white'
              }}>
              Open App
            </Button>
          </VStack>
        </HStack>
      </Flex>
    )
  }
  return (

    <Box bg='#161B45'>
      <Container maxW='6xl'>
        <Navbar />
        <Divider borderColor='gray.300' />
      </Container>
      <Container maxW='8xl'>

        <Box >
          <Flex justifyContent='space-between' alignItems='center' h='90vh'>
            <VStack>
              <Box p='10'>
                <Heading fontSize='5xl' maxW='2xl' fontWeight='bold' color='White'>Connect, Transact & Connect</Heading>
                <Text fontSize='2xl' color='white'>We help you to get custormers and services with ease</Text>
                <Button mt='10' color='#161B45' fontSize='xl' bg='white' _hover={{ color: 'white', bg: 'none', border: '1px solid white' }} rightIcon={<AiOutlineArrowRight />}>Get started. It`s Free</Button>
              </Box>

            </VStack>
            <Box>
              <Image src='./Connect.svg' alt='Connected World' w='xl' h='sm' />
            </Box>
          </Flex>
        </Box>
      </Container>
      <Box bg='#f7fafc' h='auto' p='20' >
        <VStack spacing='10'>
          <HStack spacing='40' justifyContent='center'>
            <Text color='#161B45' fontSize='4xl' maxW='60' fontWeight='medium' textAlign='left'>
              Our Features you can get
            </Text>
            <Text fontSize={['7xl', '5xl', '', '3xl', 'xl']} color='#7d7c81' maxW='xs' >we help you to get your services to the world and get you to services quick and fast</Text>
            <Button p='10' borderRadius='full'>Get started</Button>
          </HStack>
          <Feature
            title='Get Started Free'
            desc='Ye am depending propriety sweetness distrusts belonging collected.
               Smiling mention he in thought equally musical. Wisdom new and valley answer.
                Contented it so is discourse recommend. Man its upon him call mile.
               An pasture he himself believe ferrars besides cottage'
            image={<Image src='/Progress.svg' alt='dennis' h={['6xl', '7xl', '8xl', '2xl', 'xl']}
              w={['xl', '4xl', '4xl', 'lg', '80',]} />}
          />
          <Feature2
            title='Get Custormers Easily'
            desc='Ye am depending propriety sweetness distrusts belonging collected.
              Smiling mention he in thought equally musical. Wisdom new and valley answer.
               Contented it so is discourse recommend. Man its upon him call mile.
              An pasture he himself believe ferrars besides cottage'
            image={<Image src='/Progress.svg' alt='dennis' h={['6xl', '7xl', '8xl', '2xl', 'xl']}
              w={['xl', '4xl', '4xl', 'lg', '80',]} />}
          />
          <Feature
            title='Accept or Decline Request'
            desc='Ye am depending propriety sweetness distrusts belonging collected.
               Smiling mention he in thought equally musical. Wisdom new and valley answer.
                Contented it so is discourse recommend. Man its upon him call mile.
               An pasture he himself believe ferrars besides cottage'
            image={<Image src='/A_Request.svg' alt='dennis' h={['6xl', '7xl', '8xl', '2xl', 'xl']}
              w={['xl', '4xl', '4xl', 'lg', '80',]} />}
          />
           <Feature2
            title='Pull Request'
            desc='Ye am depending propriety sweetness distrusts belonging collected.
              Smiling mention he in thought equally musical. Wisdom new and valley answer.
               Contented it so is discourse recommend. Man its upon him call mile.
              An pasture he himself believe ferrars besides cottage'
            image={<Image src='/pull_request.svg' alt='dennis' h={['6xl', '7xl', '8xl', '2xl', 'xl']}
              w={['xl', '4xl', '4xl', 'lg', '80',]} />}
          />
          <Feature
            title='Get FeedBack'
            desc='Ye am depending propriety sweetness distrusts belonging collected.
               Smiling mention he in thought equally musical. Wisdom new and valley answer.
                Contented it so is discourse recommend. Man its upon him call mile.
               An pasture he himself believe ferrars besides cottage'
            image={<Image src='/FeedBack.svg' alt='dennis' h={['6xl', '7xl', '8xl', '2xl', 'xl']}
              w={['xl', '4xl', '4xl', 'lg', '80',]} />}
          />
            <Feature2
            title='Get Review'
            desc='Ye am depending propriety sweetness distrusts belonging collected.
              Smiling mention he in thought equally musical. Wisdom new and valley answer.
               Contented it so is discourse recommend. Man its upon him call mile.
              An pasture he himself believe ferrars besides cottage'
            image={<Image src='/review.svg' alt='dennis' h={['6xl', '7xl', '8xl', '2xl', 'xl']}
              w={['xl', '4xl', '4xl', 'lg', '80',]} />}
          />
        </VStack>
      </Box>
    </Box>
  )
}
