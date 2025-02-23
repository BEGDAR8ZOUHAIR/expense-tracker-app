// components/transactions/NumPadSheet.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import Typo from '@/components/Typo';

interface NumPadSheetProps {
	amount: string;
	onAmountChange: (value: string) => void;
}

const NumPadSheet = ({ amount, onAmountChange }: NumPadSheetProps) => {


	const handleNumberPress = (value: string) => {
		if (value === 'backspace') {
			onAmountChange(amount.slice(0, -1));
			return;
		}
		if (value === '.' && amount.includes('.')) return;

		if (value === '.' && !amount) {
			onAmountChange('0.');
			return;
		}
		const newAmount = amount + value;
		if (newAmount.includes('.')) {
			const [, decimal] = newAmount.split('.');
			if (decimal?.length > 2) return;
		}
		onAmountChange(newAmount);
	};

	return (
		<View style={styles.container}>

			<View style={styles.numpad}>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'backspace'].map((num) => (
					<TouchableOpacity
						key={num}
						style={styles.numKey}
						onPress={() => handleNumberPress(num.toString())}
					>
						{num === 'backspace' ? (
							<Ionicons name="backspace-outline" size={24} color={colors.neutral800} />
						) : (
							<Typo size={24} fontWeight="500">{num}</Typo>
						)}
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacingX._20,
	},
	amountContainer: {
		alignItems: 'center',
		paddingVertical: spacingY._20,
	},
	numpad: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingTop: spacingY._20,
		gap: spacingX._3,
	},
	numKey: {
		width: '32%',
		height: 80,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: spacingY._10,
		backgroundColor: colors.neutral200,
		borderRadius: 15,
	},
});

export default NumPadSheet;