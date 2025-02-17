import { Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { ModalWrapperProps } from '@/types'

const isIOS = Platform.OS === "ios"

const ModalWrapper = (
	{
		style,
		children,
		bg = colors.text
	}: ModalWrapperProps
) => {
	return (
		<View style={[styles.container, style, { backgroundColor: bg }]}>
			{children}
		</View>
	)
}

export default ModalWrapper

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: isIOS ? spacingY._15 : 50,
		paddingBottom: isIOS ? spacingY._20 : spacingY._10,
		paddingHorizontal: spacingX._20
	}

})