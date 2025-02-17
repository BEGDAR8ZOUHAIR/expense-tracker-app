import { StyleSheet, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors } from '@/constants/theme'
import ProfileChip from '@/components/ProfileChip'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/authContext'

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
			</View>
		</ScreenWrapper>
	)
}

export default Home

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}

})