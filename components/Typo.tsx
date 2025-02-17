import { Text, TextStyle } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/styling'

const Typo = (
	{
		children,
		size,
		color = colors.neutral800,
		fontWeight = '400',
		style,
		textProps = {}
	}: TypoProps
) => {
	const textStyle: TextStyle = {
		fontSize: size ? verticalScale(size) : verticalScale(18),
		color,
		fontWeight,
	}
	return (
		<Text style={[textStyle, style]} {...textProps}>{children}</Text>
	)
}

export default Typo