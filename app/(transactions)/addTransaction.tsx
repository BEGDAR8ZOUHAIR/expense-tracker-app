// screens/AddTransaction.tsx
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import HeaderTransaction from '@/components/transactions/HeaderTransaction';
import NumPadSheet from '@/components/transactions/NumPadSheet';
import TransactionForm from '@/components/transactions/TransactionForm';
import AnimatedTabs from '@/components/transactions/AnimatedTabs';
import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';

const defaultFormFields = [
	{
		icon: 'calendar-outline',
		label: 'Date',
		onPress: () => { },
	},
	{
		icon: 'wallet-outline',
		label: 'Account',
		onPress: () => { },
	},
	{
		icon: 'grid-outline',
		label: 'Category',
		onPress: () => { },
	},
	{
		icon: 'create-outline',
		label: 'Note',
		onPress: () => { },
	},
	{
		icon: 'image-outline',
		label: ' Image',
		onPress: () => { },
	},
] as const;

const AddTransaction = () => {
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');

	const handleSave = () => {
		// Add your save logic here
		// You can now use transactionType to determine if it's income or expense
	};

	const handleTabChange = (tab: 'income' | 'expense') => {
		setTransactionType(tab);
		// Reset amount when switching transaction type
		setAmount('');
	};

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<HeaderTransaction
					title="Add Transaction"
					loading={loading}
					onSave={handleSave}
				/>
				<View style={styles.tabContainer} >
					<AnimatedTabs
						selectedTab={transactionType}
						onTabChange={handleTabChange}
					/>
				</View>

				<Divider />

				<View style={styles.formContainer}>
					<TransactionForm formFields={defaultFormFields} />
				</View>

				<TouchableOpacity
					style={styles.amountContainer}
					onPress={() => { }}
				>
					<Typo
						size={16}
						fontWeight="500"
						style={styles.amountLabel}
						color={colors.neutral600}
					>
						Amount
					</Typo>
					<Typo
						size={32}
						color={transactionType === 'income' ? colors.green : colors.rose}
						style={styles.amountText}
						fontWeight="600"
					>
						{transactionType === 'income' ? '+' : '-'}${amount || '0'}
					</Typo>
				</TouchableOpacity>
				<NumPadSheet
					amount={amount}
					onAmountChange={setAmount}
				/>
			</View>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabContainer: {
		paddingVertical: verticalScale(16),
	},
	formContainer: {
		paddingVertical: verticalScale(16),
		marginBottom: verticalScale(16),
	},
	amountContainer: {
		alignItems: 'center',
	},
	amountLabel: {
		fontFamily: "Quicksand-Bold",
		fontSize: 16,
		lineHeight: 24,
		color: colors.neutral600,
	},
	amountText: {
		fontFamily: "Quicksand-Bold",
		fontSize: 40,
		lineHeight: 48,
	},
});

export default AddTransaction;