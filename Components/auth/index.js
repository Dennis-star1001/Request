import {
	Box,
	Button,
	Divider,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Select,
	Stack,
	Text,
	Textarea,
	IconButton,
	ButtonGroup,
	useEditableControls,
	useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { GoogleLogin } from 'react-google-login'
import { FcGoogle } from 'react-icons/fc'
import { FaCheckCircle } from 'react-icons/fa'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import ReactInputVerificationCode from 'react-input-verification-code'
import { MdCancel } from 'react-icons/md'
import 'yup-phone'
import { useState } from 'react'
import Axios from 'axios'
import PinInput from 'react-pin-input'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { setCookie } from 'nookies'
import Router from 'next/router'
import { sendVerificationCode } from '../queries/auth'
export const verifyCode = async (toast) => {
	function EditableControls() {
		const {
			isEditing,
			getSubmitButtonProps,
			getCancelButtonProps,
			getEditButtonProps,
		} = useEditableControls()

		return isEditing ? (
			<ButtonGroup ml='2' justifyContent='center' size='sm'>
				<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
				<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
			</ButtonGroup>
		) : (
			<Flex justifyContent='center'>
				<IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
			</Flex>
		)
	}

	return (
		<>
			<Heading color='gray.600'>
				Enter code for <br /> verification
			</Heading>
			<form>
				<FormControl id='confirmPassword'>
					<FormLabel color='gray.500'>
						Please enter the verification code sent to
						<Editable
							onSubmit={(value) => setUserData({ ...userData, phone: value })}
							mt='2'
							d='flex'
							alignItems='center'
							textAlign='center'
							defaultValue={sentPhone}
							isPreviewFocusable={false}>
							<EditablePreview mr='4' />
							<EditableInput w='40' />
							<EditableControls />
						</Editable>
					</FormLabel>
					<HStack my='10' alignItems='center'>
						<PinInput
							focus
							type='numeric'
							inputMode='numeric'
							inputStyle={{ fontWeight: '900' }}
							inputFocusStyle={{ border: 'green' }}
							onComplete={async (value) => {
								await Axios.post('http://localhost:3000/api/user/verify', {
									phoneNumber: userData.phoneNumber,
									code: value,
								})
									.then((res) => {
										setUserData({
											...userData,
											verified: true,
										})

										setVerified(true)
										toast({
											title: 'Account Verified!',
											status: 'success',
											duration: 5000,
											isClosable: true,
											position: 'top',
										})
										setTimeout(nextStep(), 2000)
									})
									.catch((err) => {
										console.log(err.response)
										toast({
											title: 'Verification error!',
											description: 'Please check code or resend code again',
											status: 'error',
											duration: 5000,
											isClosable: true,
											position: 'top',
										})
										return err
									})
							}}
							length={6}
						/>
						{verified ? (
							<MdCancel size='28' color='gray' />
						) : (
							<FaCheckCircle size='28' color='green' />
						)}
					</HStack>

					<FormErrorMessage></FormErrorMessage>
				</FormControl>

				<Flex alignItems='center' justifyContent='space-between'>
					<Text>
						Didn`t get the message?
						<Button
							onClick={() => sendVerificationCode(userData.phoneNumber, toast)}
							colorScheme='blue'
							variant='link'
							ml='2'>
							Resend
						</Button>
					</Text>
				</Flex>
			</form>
		</>
	)
}
