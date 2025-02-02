import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { useRouter } from 'expo-router'

const index = () => {
	// const router = useRouter();

	// React.useEffect(() => {
	// 	setTimeout(() => {
	// 		router.push('/auth/welcome');
	// 	}, 2000)
	// })
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require('../assets/images/splashImage.png')}
				resizeMode="contain"
			/>

		</View>
	)
}

export default index

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.neutral900,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		height: "20%",
		aspectRatio: 1,
	},
})