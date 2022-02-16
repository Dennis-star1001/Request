import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Button, VStack, Flex, Image, FormControl, FormErrorMessage, FormLabel, HStack, Input, Stack, Text, useToast, Divider, Container } from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from 'react-icons/go';
import { useState } from 'react';
import { useFormik } from 'formik';
import 'yup-phone'
import { AiOutlineArrowLeft, AiOutlineGoogle, AiOutlineTwitter } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import * as Yup from 'yup'
import Axios from 'axios'
import { setCookie } from 'nookies'
import { useRouter } from 'next/router';

export default function Signup() {
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
			await Axios.post('http://localhost:3000/api/user/login', {
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

	const registrationFormik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('Please input name'),
			lastName: Yup.string().required('Please input name'),
			email: Yup.string().email('Invalid email format').required('Required!'),
			phone: Yup.string().phone().required(),
			password: Yup.string()
				.required('No password provided.')
				.min(8, 'Password is too short - should be 8 chars minimum.')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*.,])(?=.{8,})/,
					'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
				),
			confirmPassword: Yup.string()
				.required('Please confirm password.')
				.oneOf([Yup.ref('password'), null], 'Passwords must match'),
		}),
		onSubmit: async (values) => {
			setLoading(true)

			console.log(userData)
			console.log('valeeees:', values.phone)
			await Axios.post('http://localhost:3000/api/user/userexist', {
				email: values.email,
				phoneNumber: values.phone,
			})
				.then(async (res) => {
					sendVerificationCode(values.phone, toast)
					setLoading(false)
					setSentPhone(values.phone)
					setUserData({
						email: values.email,
						password: values.password,
						firstName: values.lastName,
						lastName: values.lastName,
						phoneNumber: values.phone,
					})
					nextStep()

				})
				.catch((err) => {
					console.log(err.response)
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
			// Router.push('/dashboard')
			// setLoading(false).catch((err) => {
			// 	console.log(err.response.data.message[0].messages[0].message)

			// 	toast({
			// 		title: 'Error!',
			// 		description: `${err.response.data.message[0].messages[0].message} Please try again`,
			// 		status: 'error',
			// 		duration: 5000,
			// 		isClosable: true,
			// 		position: 'bottom-left',
			// 	})
			// 	setLoading(false)
			// })

			// setLoading(false)
		},
	})
	return (
		<Box bg='white' h='100vh'>
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
			<HStack justifyContent='space-between' alignItems='center' h='100vh' >

				<Box>
					{/* <Button leftIcon={<AiOutlineArrowLeft />} colorScheme='teal' variant='#50c1e4'>Back</Button> */}
					<Flex flexDirection='column' px='10' w='lg'>
						<Text textAlign='left' fontWeight='bold' color='#161b45' fontSize='3xl' py='10'>
							Sign in
						</Text>

						<form onSubmit={registrationFormik.handleSubmit}>
							<Stack spacing='5'>
								<FormControl
									id='firstName'
									isInvalid={
										registrationFormik.errors.firstName &&
										registrationFormik.touched.firstName
									}>
									<FormLabel>First Name</FormLabel>
									<Input
										type='text'
										name='firstName'
										_focus={{
											border: ' 1px solid #48bb78',
										}}
										onChange={registrationFormik.handleChange}
										value={registrationFormik.values.firstName}
									/>
									<FormErrorMessage>
										{registrationFormik.errors.firstName}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='lastName'
									isInvalid={
										registrationFormik.errors.lastName &&
										registrationFormik.touched.lastName
									}>
									<FormLabel>Last Name</FormLabel>
									<Input
										_focus={{
											border: ' 1px solid #48bb78',
										}}
										onChange={registrationFormik.handleChange}
										value={registrationFormik.values.lastName}
									/>
									<FormErrorMessage>
										{registrationFormik.errors.lastName}
									</FormErrorMessage>
								</FormControl>
								<HStack spacing='4'>
									<FormControl
										id='phone'
										isInvalid={
											registrationFormik.errors.phone &&
											registrationFormik.touched.phone
										}>
										<FormLabel>Phone number</FormLabel>
										<Input
											type='tel'
											_focus={{
												border: ' 1px solid #48bb78',
											}}
											onChange={registrationFormik.handleChange}
											value={registrationFormik.values.phone}
										/>
										<FormErrorMessage>
											{registrationFormik.errors.phone}
										</FormErrorMessage>
									</FormControl>
									<FormControl
										id='email'
										isInvalid={
											registrationFormik.errors.email &&
											registrationFormik.touched.email
										}>
										<FormLabel>Email Address</FormLabel>
										<Input
											type='email'
											_focus={{
												border: ' 1px solid #48bb78',
											}}
											onChange={registrationFormik.handleChange}
											value={registrationFormik.values.email}
										/>
										<FormErrorMessage>
											{registrationFormik.errors.email}
										</FormErrorMessage>
									</FormControl>
								</HStack>
								<FormControl
									id='password'
									isInvalid={
										registrationFormik.errors.password &&
										registrationFormik.touched.password
									}>
									<FormLabel>Password</FormLabel>
									<Input
										type='password'
										_focus={{
											border: ' 1px solid #48bb78',
										}}
										onChange={registrationFormik.handleChange}
										value={registrationFormik.values.password}
									/>
									<FormErrorMessage>
										{registrationFormik.errors.password}
									</FormErrorMessage>
								</FormControl>

								<FormControl
									id='confirmPassword'
									isInvalid={
										registrationFormik.errors.confirmPassword &&
										registrationFormik.touched.confirmPassword
									}>
									<FormLabel>Confirm Password</FormLabel>
									<Input
										type='password'
										_focus={{
											border: ' 1px solid #48bb78',
										}}
										onChange={registrationFormik.handleChange}
										value={registrationFormik.values.confirm_password}
									/>
									<FormErrorMessage>
										{registrationFormik.errors.confirmPassword}
									</FormErrorMessage>
								</FormControl>

								<Flex alignItems='center' justifyContent='space-between'>
									<Text>
										Have an account?
										<Button
											ml='2'
											colorScheme='blue'
											variant='link'
											onClick={() =>
												Router.push('/Login', undefined, { shallow: true })
											}>
											Login
										</Button>
									</Text>
									<Button
										fontSize='large'
										type='submit'
										bg='#161b45'
										w='24'
										color='white'
										isLoading={loading}
										_hover={{

											bg: '#161b45',
											color: 'white',
											border: '1px solid #161b45'
										}}>
										Next
									</Button>
								</Flex>
							</Stack>
						</form>
					</Flex>
				</Box>
				<HStack spacing='14' position='fixed' top='80' right='40'>
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
