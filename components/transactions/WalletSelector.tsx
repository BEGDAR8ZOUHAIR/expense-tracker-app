// components/transactions/WalletSelector.tsx
import Typo from '@/components/Typo';
import { colors } from '@/constants/theme';
import { WalletType } from '@/contexts/wallet';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

type WalletSelectorProps = {
	wallets?: WalletType[];
	selectedWallet?: WalletType | null;
	onSelect?: (wallet: WalletType) => void;
	onClose?: () => void;

};

const WalletSelector = ({ wallets, selectedWallet, onSelect, onClose }: any) => {
	return (
		<View style={styles.content}>
			<View style={styles.header}>
				<Typo size={18} fontWeight="600">Select Wallet</Typo>
				<TouchableOpacity onPress={onClose}>
					<Typo color={colors.primary}>Close</Typo>
				</TouchableOpacity>
			</View>

			<FlatList
				data={wallets}
				keyExtractor={(item) => item.id || ''}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.walletItem,
							selectedWallet?.id === item.id && styles.selectedWallet
						]}
						onPress={() => onSelect(item)}
					>
						<Typo size={16}>{item.name}</Typo>
						<Typo size={14} color={colors.neutral600}>${item.amount}</Typo>
					</TouchableOpacity>
				)}
				contentContainerStyle={styles.listContent}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: 'white',
	},
	indicator: {
		backgroundColor: colors.neutral200,
		width: 32,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral200,
	},
	listContent: {
		paddingBottom: 24,
	},
	walletItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: colors.neutral200,
	},
	selectedWallet: {
		backgroundColor: colors.neutral100,
	},
});

export default WalletSelector;