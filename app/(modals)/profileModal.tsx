import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ModalWrapper from '@/components/ModalWrapper'
import BackButton from '@/components/BackButton'
import { colors, spacingY } from '@/constants/theme'
import { scale, verticalScale } from '@/utils/styling'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native'
import { getProfileImage } from "@/services/imagesService";
import { useAuth } from '@/contexts/authContext'
import { Ionicons } from '@expo/vector-icons'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { useRouter } from 'expo-router'
import { UserDataType } from '@/types'
import { updateUser } from '@/services/userService'

const profileModal = () => {
	const { user, updateUserData } = useAuth();
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	const [userData, setUserData] = React.useState<UserDataType>({
		name: '',
		image: null,
	});

	const handleImagePick = async () => { };

	useEffect(() => {
		if (user) {
			setUserData(prevState => ({
				...prevState,
				image: user.image || null,
				name: user.name || ''
			}));
		}
	}, [user]); // Add the 'user' dependency

	const handleSumbit = async () => {
		let { name, image } = userData;
		if (!name.trim()) {
			Alert.alert('Error', 'Name is required');
			return;
		}

		setLoading(true);
		const res = await updateUser(user?.uid as string, userData);
		setLoading(false);
		if (res.success) {
			await updateUserData(user?.uid as string);
			router.back();
		}
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
						source={getProfileImage(userData.image)}
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
			<View style={{ gap: 5, marginTop: spacingY._20 }}>
				<Input
					icon={<Ionicons name="person" size={24} color={colors.neutral300} />}
					onChangeText={(value) => setUserData(prevState => ({ ...prevState, name: value }))}
					value={userData.name}
					placeholder='Name'
				/>
			</View>
			{/* button */}
			<View style={styles.buttonContainer}>
				<Button onPress={handleSumbit} loading={loading}>
					<Typo size={verticalScale(16)} fontWeight={'500'} color={colors.text}>Update Profile</Typo>
				</Button>
			</View>
		</ModalWrapper>
	);
};

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
	},
	buttonContainer: {
		flex: 1,
		justifyContent: "flex-end",
		marginBottom: verticalScale(100)
	}
})
