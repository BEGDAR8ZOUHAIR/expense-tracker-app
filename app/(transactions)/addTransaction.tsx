// app/(modals)/addTransaction.tsx
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import BottomSheet from '@gorhom/bottom-sheet'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import Typo from '@/components/Typo'
import HeaderTransaction from '@/components/transactions/HeaderTransaction'
// import NumPadSheet from '@/components/transactions/NumPadSheet'

const AddTransaction = () => {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);

	// Ref for bottom sheet
	const numpadRef = useRef<BottomSheet>(null);

	const handleSave = () => {
		// Add your save logic here
	};

	const handleOpenNumpad = useCallback(() => {
		numpadRef.current?.snapToIndex(0);
	}, []);

	return (
		<ScreenWrapper>
			<HeaderTransaction
				title="Add Transaction"
				loading={loading}
				onSave={handleSave}
			/>

			<TouchableOpacity
				style={styles.amountContainer}
				onPress={handleOpenNumpad}
			>
				<Typo size={16} color={colors.neutral600}>Amount</Typo>
				<Typo size={32} fontWeight="600">${amount || '0'}</Typo>
			</TouchableOpacity>

			<View style={styles.formContainer}>
				<TouchableOpacity style={styles.formItem}>
					<Ionicons name="calendar-outline" size={24} color={colors.neutral800} />
					<Typo>Select Date</Typo>
					<Ionicons name="chevron-forward" size={24} color={colors.neutral800} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.formItem}>
					<Ionicons name="wallet-outline" size={24} color={colors.neutral800} />
					<Typo>Select Account</Typo>
					<Ionicons name="chevron-forward" size={24} color={colors.neutral800} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.formItem}>
					<Ionicons name="grid-outline" size={24} color={colors.neutral800} />
					<Typo>Select Category</Typo>
					<Ionicons name="chevron-forward" size={24} color={colors.neutral800} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.formItem}>
					<Ionicons name="create-outline" size={24} color={colors.neutral800} />
					<Typo>Add Note</Typo>
					<Ionicons name="chevron-forward" size={24} color={colors.neutral800} />
				</TouchableOpacity>

				<TouchableOpacity style={styles.formItem}>
					<Ionicons name="image-outline" size={24} color={colors.neutral800} />
					<Typo>Add Receipt Image</Typo>
					<Ionicons name="chevron-forward" size={24} color={colors.neutral800} />
				</TouchableOpacity>
			</View>

			{/* <NumPadSheet
				ref={numpadRef}
				amount={amount}
				onAmountChange={setAmount}
			/> */}
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	amountContainer: {
		alignItems: 'center',
		paddingVertical: spacingY._20,
	},
	formContainer: {
		paddingHorizontal: spacingX._20,
		gap: spacingY._15,
	},
	formItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: spacingX._15,
		backgroundColor: colors.neutral200,
		borderRadius: 10,
		gap: spacingX._10,
	},
});

export default AddTransaction;