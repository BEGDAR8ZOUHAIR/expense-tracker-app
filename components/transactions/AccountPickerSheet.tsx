// components/transactions/AccountPickerSheet.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { colors, spacingX, spacingY } from '@/constants/theme';
import Typo from '@/components/Typo';
import { useWallet } from '@/contexts/wallet';

interface Props {
	onSelect: (walletId: string) => void;
}

const AccountPickerSheet = React.forwardRef<BottomSheetModal, Props>(({ onSelect }, ref) => {
	const { wallets } = useWallet();

	return (
		<BottomSheetModal
			ref={ref}
			snapPoints={['25%', '50%']}
			index={1}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Typo size={18} fontWeight="600">Select Account</Typo>
				</View>

				<View style={styles.walletList}>
					{wallets.map((wallet) => (
						<TouchableOpacity
							key={wallet.id}
							style={styles.walletItem}
							onPress={() => onSelect(wallet.id!)}
						>
							<View style={styles.walletIcon}>
								{/* Add wallet icon here */}
							</View>
							<View style={styles.walletInfo}>
								<Typo fontWeight="600">{wallet.name}</Typo>
								<Typo color={colors.neutral600}>${wallet.amount}</Typo>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</View>
		</BottomSheetModal>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		padding: spacingX._20,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral200,
	},
	walletList: {
		paddingHorizontal: spacingX._20,
	},
	walletItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: spacingY._15,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral200,
	},
	walletIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.neutral200,
		marginRight: spacingX._15,
	},
	walletInfo: {
		flex: 1,
	},
});

export default AccountPickerSheet;