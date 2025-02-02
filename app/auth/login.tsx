import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { Mailbox, Lock } from 'phosphor-react-native';
import { verticalScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { Link, useRouter } from 'expo-router'
import { useAuth } from '@/contexts/authContext';

const login = () => {
	const emailRef = React.useRef('');
	const passordRef = React.useRef('');
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	const { login: loginUser } = useAuth();

	const handleSumbit = async () => {
		setLoading(true);
		const res = await loginUser(emailRef.current, passordRef.current);
		setLoading(false);
		if (res.success) {
			router.navigate('/(tabs)');
		} else {
			alert(res.msg)
		}
	}

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				{/* back button	 */}
				<BackButton iconSize={28} />

				<View style={{ gap: 5, marginTop: spacingY._20 }}>
					<Typo fontWeight={'700'} size={24}>Sign In</Typo>
					<Typo fontWeight={'500'}>Enter your email and password</Typo>
				</View>
				{/* form */}
				<View style={styles.form}>
					<Input
						icon={<Mailbox color={colors.neutral300} />}
						placeholder='Enter your email'
						onChangeText={(value) => (emailRef.current = value)}
					/>
					<Input
						icon={<Lock color={colors.neutral300} />}
						placeholder='Enter your password'
						secureTextEntry
						onChangeText={(value) => (passordRef.current = value)}
					/>
				</View>
				{/* forgot password */}
				<Text style={styles.forgotPassword}>Forgot Password?</Text>
				{/* button */}
				<Button onPress={handleSumbit} loading={loading}>
					<Typo size={verticalScale(16)} fontWeight={'500'} color={colors.neutral900}>Login</Typo>
				</Button>

				{/* footer */}
				<View style={styles.footer}>
					<Link href={'/auth/register'}>
						<Text style={styles.footerText}>Don't have an account? {' '}</Text>
						<Text style={styles.footerLinkText}>Register</Text>
					</Link>
				</View>
			</View>
		</ScreenWrapper >
	)
}

export default login

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: spacingY._30,
		paddingHorizontal: spacingX._20,
		fontWeight: '700',
		color: colors.text
	},
	welcomeText: {
		fontSize: verticalScale(20),
		fontWeight: '700',
		color: colors.text
	},
	form: {
		gap: spacingY._20
	},
	forgotPassword: {
		textAlign: 'right',
		fontWeight: '500',
		color: colors.text
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 5
	},
	footerText: {
		textAlign: 'center',
		color: colors.text,
		fontSize: verticalScale(14)
	},
	footerLinkText: {
		color: colors.primary,
		fontSize: verticalScale(14),
	}
})

function loginUser(current: string, current1: string) {
	throw new Error('Function not implemented.');
}
