import { Dimensions, Platform, StatusBar, SafeAreaView, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

interface ScreenWrapperProps {
	children: React.ReactNode;
	style?: ViewStyle;
}

const { height } = Dimensions.get('window')

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
	const paddingTop = Platform.OS === 'ios'
		? height * 0.06
		: StatusBar.currentHeight || 0;

	return (
		<SafeAreaView style={[styles.container, { paddingTop }, style]}>
			<StatusBar
				barStyle="dark-content"
				backgroundColor={colors.neutral900}
				translucent
			/>
			{children}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.neutral900,
		marginTop: StatusBar.currentHeight || 0,
	},
})

export default ScreenWrapper