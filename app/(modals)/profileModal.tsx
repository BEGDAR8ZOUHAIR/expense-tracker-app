import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import BackButton from '@/components/BackButton'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale } from '@/utils/styling'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'
import { getProfileImage } from "@/services/imagesService";
import Loading from '@/components/Loading'
import { useAuth } from '@/contexts/authContext'
import { Ionicons } from '@expo/vector-icons'

const profileModal = () => {
	const { user, uploadProfileImage } = useAuth();

	const handleImagePick = async () => {
	};
	return (
		<ModalWrapper style={styles.container}>
			<BackButton />
			<View style={styles.avatarContainer}>
				<LinearGradient
					colors={["#4c669f", "#FC7533", colors.primary]}
					style={styles.avatarGradient}
				>
					<Image
						source={
							getProfileImage(user?.image)
						}
						style={styles.avatar}
						resizeMode="cover"
					/>
				</LinearGradient>
				<Ionicons
					name="camera"
					size={24}
					color={colors.neutral100}
					onPress={handleImagePick}
				/>
			</View>
		</ModalWrapper>
	)
}

export default profileModal

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	avatarContainer: {
		alignItems: "center"
	},
	avatarGradient: {
		width: scale(144),
		height: scale(144),
		borderRadius: scale(72),
		padding: scale(8),
		alignItems: "center",
		justifyContent: "center"
	},
	avatar: {
		width: scale(128),
		height: scale(128),
		borderRadius: scale(64)
	}



})