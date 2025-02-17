// Home.tsx
import { StyleSheet, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX } from '@/constants/theme'
import ProfileChip from '@/components/ProfileChip'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/authContext'
import StatCard from '@/components/StatCard'

const Home = () => {
	const { user } = useAuth();
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
					<View style={styles.stateCards}>
						<StatCard
							type="Income"
							amount={1000}
							icon="cash"
						/>
						<StatCard
							type="Expense"
							amount={500}
							icon="cash"
						/>
					</View>
				</View>
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
	stateCards: {
		flexDirection: 'row',
		gap: 10,
	}
})