import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX } from '@/constants/theme'
import ProfileChip from '@/components/ProfileChip'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/authContext'
import StatCard from '@/components/StatCard'
import Typo from '@/components/Typo'
import { useWallet } from '@/contexts/wallet'
import { FloatingAction } from "react-native-floating-action";
import { router } from 'expo-router'



const Home = () => {
	const { user } = useAuth();
	const { wallet, fetchWallets } = useWallet();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const loadWallets = async () => {
			setIsLoading(true);
			try {
				await fetchWallets();
			} catch (error) {
				console.error('Error loading wallets:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadWallets();
	}, []);

	if (isLoading) {
		return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color={colors.neutral600} /></View>
	}

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<ProfileChip
					imageUrl={user?.image}
					name={user?.name}
					message="Hello"
					rightIcon={<Ionicons name="notifications" size={24} color={colors.neutral800} />}
				/>
				<View style={styles.stateCardsContainer}>
					<View style={styles.balanceContainer}>
						<View style={styles.balance}>
							<Typo fontWeight={'500'} size={14} color={colors.neutral500}>Balance</Typo>
							<Typo fontWeight={'500'} size={14} color={colors.neutral500}>
								${wallet?.amount || 0}
							</Typo>
						</View>
					</View>
					<View style={styles.stateCards}>
						<StatCard
							type="Income"
							amount={wallet?.totalIncome || 0}
						/>
						<StatCard
							type="Expense"
							amount={wallet?.totalExpenses || 0}
						/>
					</View>
				</View>
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => router.push('/(transactions)/addTransaction')}
				>
					<Ionicons name="add" size={24} color={colors.white} />
				</TouchableOpacity>

			</View>
		</ScreenWrapper>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	stateCardsContainer: {
		paddingHorizontal: spacingX._20,
		marginTop: 20,
	},
	balanceContainer: {
		marginBottom: 16,  // Add some spacing between balance and stat cards
	},
	balance: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	stateCards: {
		flexDirection: 'row',
		gap: 10,
	},
	addButton: {
		position: 'absolute',
		bottom: 100,
		right: 20,
		width: 60,
		height: 60,
		backgroundColor: colors.primary,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},

})