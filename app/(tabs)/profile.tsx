import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import Typo from '@/components/Typo'
import ScreenWrapper from '@/components/ScreenWrapper'
import Button from '@/components/Button'
import { auth } from '@/config/firebase'

const profile = () => {
	return (
		<ScreenWrapper>
			<Button onPress={() => auth.signOut()}>
				<Typo fontWeight={'700'} color={colors.neutral900} size={24}>Logout</Typo>
			</Button>
		</ScreenWrapper>
	)
}

export default profile

const styles = StyleSheet.create({})