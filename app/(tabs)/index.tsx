import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { auth } from '@/config/firebase'
import { colors } from '@/constants/theme'

const Home = () => {
	const handleLogout = async () => {
		await auth.signOut();
	}
	return (
		<ScreenWrapper>
			<Button onPress={handleLogout}>
				<Typo fontWeight={'700'} color={colors.neutral900} size={24}>Logout</Typo>
			</Button>
		</ScreenWrapper>
	)
}

export default Home

const styles = StyleSheet.create({})