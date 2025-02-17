import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import BackButton from '@/components/BackButton'
import { colors, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'
import { getProfileImage } from "@/services/imagesService"
import { useAuth } from '@/contexts/authContext'
import { Ionicons } from '@expo/vector-icons'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { useRouter } from 'expo-router'
import { UserDataType } from '@/types'
import { updateUser } from '@/services/userService'
import * as ImagePicker from 'expo-image-picker'

const ProfileModal = () => {
	const { user, updateUserData } = useAuth()
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const [userData, setUserData] = useState<UserDataType>({
		name: '',
		image: null,
	})

	useEffect(() => {
		if (user) {
			setUserData(prevState => ({
				...prevState,
				image: user.image || null,
				name: user.name || ''
			}))
		}
	}, [user])

	const handleImagePick = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			})

			if (!result.canceled && result.assets && result.assets.length > 0) {
				// Update the image state with the uri from the picked image
				setUserData(prevState => ({
					...prevState,
					image: {
						uri: result.assets[0].uri,
						width: result.assets[0].width,
						height: result.assets[0].height,
						type: 'image',
					}
				}))
			}
		} catch (error) {
			Alert.alert('Error', 'Failed to pick image')
			console.error('Image picker error:', error)
		}
	}

	const handleSumbit = async () => {
		try {
			const { name, image } = userData
			if (!name.trim()) {
				Alert.alert('Error', 'Name is required')
				return
			}

			setLoading(true)
			const res = await updateUser(user?.uid as string, userData)

			if (res.success) {
				await updateUserData(user?.uid as string)
				router.back()
			} else {
				Alert.alert('Error', 'Failed to update profile')
			}
		} catch (error) {
			Alert.alert('Error', 'An unexpected error occurred')
			console.error('Update profile error:', error)
		} finally {
			setLoading(false)
		}
	}

	const renderProfileImage = () => {
		const imageSource = userData.image
			? { uri: typeof userData.image === 'string' ? userData.image : userData.image.uri }
			: getProfileImage(null)

		return (
			<Image
				source={imageSource}
				style={styles.avatar}
				resizeMode="cover"
			/>
		)
	}

	return (
		<ModalWrapper style={styles.container}>
			<BackButton />
			<View style={styles.avatarContainer}>
				<LinearGradient
					colors={["#4c669f", "#FC7533", colors.primary]}
					style={styles.avatarGradient}
				>
					{renderProfileImage()}
				</LinearGradient>
				<TouchableOpacity onPress={handleImagePick} style={styles.iconContainer}>
					<Ionicons
						name="camera"
						size={24}
						color={colors.text}
					/>
				</TouchableOpacity>
			</View>
			<View style={{ gap: spacingY._10, marginTop: spacingY._30 }}>
				<Input
					icon={<Ionicons name="person" size={24} color={colors.neutral800} />}
					onChangeText={(value) => setUserData(prevState => ({ ...prevState, name: value }))}
					value={userData.name}
					placeholder='Name'
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button onPress={handleSumbit} loading={loading}>
					<Typo size={verticalScale(16)} fontWeight={'800'} color={colors.neutral100}>
						Update Profile
					</Typo>
				</Button>
			</View>
		</ModalWrapper>
	)
}

export default ProfileModal

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatarContainer: {
		alignItems: "center",
		marginBottom: scale(20)
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
		borderRadius: scale(64),
	},
	iconContainer: {
		backgroundColor: colors.neutral500,
		borderRadius: scale(64),
		padding: scale(8),
		position: "absolute",
		bottom: -scale(10),
		right: scale(110),
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: verticalScale(100),
	}
})