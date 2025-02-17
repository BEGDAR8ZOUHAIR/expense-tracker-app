import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BackButtonProps } from '@/types'
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { verticalScale } from '@/utils/styling';
import { colors, radius } from '@/constants/theme';

const BackButton = ({ style, iconSize = 26 }: BackButtonProps
) => {
	const router = useRouter();
	return (
		<TouchableOpacity style={[styles.backButton, style]} onPress={() => router.back()}>
			<Ionicons name="arrow-back" size={iconSize} color={colors.neutral100} />
		</TouchableOpacity>
	)
}

export default BackButton

const styles = StyleSheet.create({
	backButton: {
		backgroundColor: colors.neutral500,
		alignSelf: 'flex-start',
		borderRadius: radius._10,
		borderCurve: 'continuous',
		padding: verticalScale(5),
	}
})