// components/HeaderTransaction.tsx
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, spacingY } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Typo from '../Typo'

interface HeaderTransactionProps {
	title: string;
	loading?: boolean;
	onSave?: () => void;
	showSaveButton?: boolean;
	customLeftButton?: React.ReactNode;
}

const HeaderTransaction = ({
	title,
	loading = false,
	onSave,
	showSaveButton = true,
	customLeftButton
}: HeaderTransactionProps) => {
	const router = useRouter();

	return (
		<View style={styles.header}>
			{customLeftButton || (
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="close" size={25} color={colors.neutral800} />
				</TouchableOpacity>
			)}

			<Typo size={18} fontWeight="600">{title}</Typo>

			{showSaveButton ? (
				<TouchableOpacity onPress={onSave} disabled={loading}>
					<Typo color={colors.primary} fontWeight="600">
						{loading ? 'Saving...' : 'Save'}
					</Typo>
				</TouchableOpacity>
			) : (
				<View style={styles.placeholder} />
			)}
		</View>
	)
}

export default HeaderTransaction

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: spacingY._20,
		paddingHorizontal: spacingY._20
	},
	placeholder: {
		width: 40,
	}
})