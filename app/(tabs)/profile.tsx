import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/imagesService";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { UserDataType } from "@/types";

const MENU_ITEMS = [
	{
		icon: <AntDesign name="user" size={24} color={colors.primary} />,
		title: "Edit Profile",
		route: "(modals)/profileModal"
	},
	{
		icon: <MaterialIcons name="favorite-border" size={24} color={colors.primary} />,
		title: "Favourites",
		route: "favourites"
	},
	{
		icon: <MaterialIcons name="privacy-tip" size={24} color={colors.primary} />,
		title: "Privacy & Policy",
		route: "privacyAndPolicy"
	},
	{
		icon: <Ionicons name="settings-outline" size={24} color={colors.primary} />,
		title: "Settings",
		route: "settings"
	}
];

const ProfileScreen = () => {
	const router = useRouter();
	const isIOS = Platform.OS === "ios";
	const { user, updateUserData } = useAuth();
	const [userData, setUserData] = useState<UserDataType>({
		name: '',
		image: null,
	})

	const handleLogout = async () => {
		await auth.signOut();
	};

	useEffect(() => {
		if (user) {
			setUserData(prevState => ({
				...prevState,
				image: user.image || null,
				name: user.name || ''
			}))
		}
	}, [user])

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

	const MenuItem = ({ icon, title, route }: any) => (
		<Animated.View entering={FadeInDown.duration(1000).springify().damping(15)}>
			<TouchableOpacity onPress={() => router.push(route)}>
				<View style={styles.menuItem}>
					<View style={styles.menuIcon}>{icon}</View>
					<Text style={styles.menuItemText}>{title}</Text>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);

	return (
		<ScreenWrapper>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={[styles.avatarContainer, { paddingTop: isIOS ? 40 : 10 }]}>
						<LinearGradient
							colors={["#4c669f", "#FC7533", colors.primary]}
							style={styles.avatarGradient}
						>
							{renderProfileImage()}
						</LinearGradient>
					</View>
					<Text style={[styles.name, { fontFamily: "HelvetIns" }]}>
						{user?.name}
					</Text>
					<Text style={styles.title}>{user?.email}</Text>
				</View>

				<ScrollView style={styles.menuContainer}>
					{MENU_ITEMS.map((item, index) => (
						<MenuItem key={index} {...item} />
					))}
					<Animated.View entering={FadeInUp.duration(1000).springify().damping(15)}>
						<Button onPress={handleLogout} style={styles.logoutButton}>
							<Typo fontWeight="700" color={colors.neutral900} size={16}>
								Logout
							</Typo>
						</Button>
					</Animated.View>
				</ScrollView>
			</View>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		alignItems: "center",
		paddingVertical: 20,
		position: "relative"
	},
	avatarContainer: {
		alignItems: "center"
	},
	avatarGradient: {
		width: 144,
		height: 144,
		borderRadius: 72,
		padding: 8,
		alignItems: "center",
		justifyContent: "center"
	},
	avatar: {
		width: 128,
		height: 128,
		borderRadius: 64
	},
	name: {
		fontSize: 24,
		color: colors.neutral800,
		marginTop: 16
	},
	title: {
		fontSize: 20,
		color: colors.neutral800,
		fontWeight: "bold",
		marginTop: 4
	},
	menuContainer: {
		flex: 1,
		marginTop: 20
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
	},
	menuIcon: {
		width: "20%",
		alignItems: "center"
	},
	menuItemText: {
		fontSize: 20,
		color: colors.neutral800
	},
	logoutButton: {
		width: "60%",
		alignSelf: "center",
		marginVertical: 20
	},
	uploadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: colors.neutral800,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 64,
	},
});

export default ProfileScreen;