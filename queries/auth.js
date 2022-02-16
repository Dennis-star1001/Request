import React from 'react'
import Axios from 'axios'

export const sendVerificationCode = async (phone, toast) => {
	console.log(toast)
	return await Axios.post('http://localhost:3000/api/user/send-code', {
		phoneNumber: phone,
	})
		.then((res) => {
			toast({
				title: 'Account Created!',
				description: 'Please check your phone for verification code.',
				res,
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top',
			})
		})
		.catch((err) => {
			console.log(err.response.data)
			toast({
				title: `${err.response.data}`,
				description: 'Please click on resend code to send again',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'top',
			})
			return err
		})
}

export const verifyToken = async (phone, toast) => {

 }