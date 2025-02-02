import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Button from '@/components/Button'

const welcome = () => (
	<ScreenWrapper>
		<View style={styles.container}>
			{/* login */}
			<View>
				<TouchableOpacity style={styles.loginButton}>
					<Typo fontWeight={'500'}>Sign In</Typo>
				</TouchableOpacity>
				<Image source={require('../../assets/images/welcome.png')}
					style={styles.welcomeImage}
					resizeMode='contain'
				/>
			</View>
			{/* footer */}
			<View style={styles.footer}>
				<View style={{ alignItems: 'center' }}>
					<Typo fontWeight={'700'} size={24}>Always take control</Typo>
					<Typo fontWeight={'700'} size={24}>of your finances</Typo>
				</View>
				<View style={{ alignItems: 'center', gap: verticalScale(2) }}>
					<Typo size={16}>Manage your finances with ease</Typo>
					<Typo size={16}>track your spending habits</Typo>
				</View>
				{/* button */}
				<View style={styles.buttonContainer}>
					<Button onPress={() => { }}>
						<Typo size={22} fontWeight={'600'} color={colors.neutral900}>Get Started</Typo>
					</Button>
				</View>
			</View>

		</View>
	</ScreenWrapper>

)

export default welcome

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		paddingTop: spacingY._7,
	},
	welcomeImage: {
		width: '100%',
		height: verticalScale(300),
		alignSelf: 'center',
		marginTop: verticalScale(100),
	},
	loginButton: {
		alignSelf: 'flex-end',
		marginRight: spacingX._20,
	},
	footer: {
		backgroundColor: colors.neutral900,
		alignItems: 'center',
		paddingTop: verticalScale(30),
		paddingBottom: verticalScale(45),
		gap: spacingY._20,
		shadowColor: colors.white,
		shadowOffset: {
			width: 0,
			height: -10,
		},
		shadowOpacity: 0.15,
		shadowRadius: 25,
		elevation: 10,
	},
	buttonContainer: {
		width: '100%',
		paddingHorizontal: spacingX._25,
	},
})