// screens/AddTransaction.tsx
import ScreenWrapper from '@/components/ScreenWrapper';
import Typo from '@/components/Typo';
import AnimatedTabs from '@/components/transactions/AnimatedTabs';
import HeaderTransaction from '@/components/transactions/HeaderTransaction';
import NumPadSheet from '@/components/transactions/NumPadSheet';
import TransactionForm from '@/components/transactions/TransactionForm';
import WalletSelector from '@/components/transactions/WalletSelector';
import { colors } from '@/constants/theme';
import { useWallet } from '@/contexts/wallet';
import { verticalScale } from '@/utils/styling';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';



const AddTransaction = () => {
	const { wallet, wallets, setWallet, addTransaction } = useWallet();
	const [amount, setAmount] = useState('');
	const [loading, setLoading] = useState(false);
	const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
	const [note, setNote] = useState('');
	const [category, setCategory] = useState('');
	const [date, setDate] = useState(new Date());
	const sheetRef = useRef<BottomSheetMethods>(null);

	const handleSheetChanges = useCallback((index: number) => {
		console.log('handleSheetChanges', index);
	}, []);

	const defaultFormFields = [
		{
			icon: 'wallet-outline',
			label: 'Account',
			value: wallet?.name || 'Select Wallet',
			onPress: () => sheetRef.current?.open(),
		},

		{
			icon: 'grid-outline',
			label: 'Category',
			value: category || 'Select Category',
			onPress: () => {
				// Add category selection logic here
			},
		},
		{
			icon: 'create-outline',
			label: 'Note',
			value: note,
			onPress: () => {
				// Add note input logic here
			},
		},
		{
			icon: 'image-outline',
			label: 'Image',
			onPress: () => {
				// Add image picker logic here
			},
		},
	];

	const handleSave = async () => {
		if (!wallet?.id) {
			Alert.alert('Error', 'Please select a wallet first');
			return;
		}

		if (!amount || parseFloat(amount) <= 0) {
			Alert.alert('Error', 'Please enter a valid amount');
			return;
		}

		setLoading(true);
		try {
			const result = await addTransaction({
				amount: parseFloat(amount),
				type: transactionType,
				date: date,
				category: category,
				note: note,
				walletId: wallet.id,
			});

			if (result.success) {
				// Reset form and navigate back
				setAmount('');
				setNote('');
				setCategory('');
				// You can add navigation here to go back to the previous screen
				// navigation.goBack();
			} else {
				Alert.alert('Error', result.msg || 'Failed to add transaction');
			}
		} catch (error) {
			Alert.alert('Error', 'Failed to add transaction');
		} finally {
			setLoading(false);
		}
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
						onTabChange={setTransactionType}
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
						color={transactionType === 'income' ? colors.primary : colors.rose}
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


			<BottomSheet
				ref={sheetRef}
				height={600}

			>
				<WalletSelector
					wallets={wallets}
					onSelect={setWallet}
					selectedWallet={wallet}
				/>
			</BottomSheet>
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
		fontSize: 18,
		lineHeight: 24,
		color: colors.neutral600,
		marginBottom: verticalScale(8),
	},
	amountText: {
		fontFamily: "Quicksand-Bold",
		fontSize: 50,
	},
});

export default AddTransaction;
