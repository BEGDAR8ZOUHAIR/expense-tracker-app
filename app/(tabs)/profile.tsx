import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";

const MENU_ITEMS = [
	{
		icon: <AntDesign name="user" size={24} color={colors.primary} />,
		title: "Edit Profile",
		route: "editProfile"
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

	const handleLogout = async () => {
		await auth.signOut();
	};

	const MenuItem = ({ icon, title, route }: any) => (
		<TouchableOpacity onPress={() => router.push(route)}>
			<View style={styles.menuItem}>
				<View style={styles.menuIcon}>{icon}</View>
				<Text style={styles.menuItemText}>{title}</Text>
			</View>
		</TouchableOpacity>
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
							<Image
								source={{ uri: "https://hoanguyenit.com/images/hoanguyencoder.jpg" }}
								style={styles.avatar}
								resizeMode="cover"
							/>
						</LinearGradient>
					</View>

					<Text style={[styles.name, { fontFamily: "HelvetIns" }]}>
						Hoa Nguyen Coder
					</Text>
					<Text style={styles.title}>Web Developer</Text>
				</View>

				<ScrollView style={styles.menuContainer}>
					{MENU_ITEMS.map((item, index) => (
						<MenuItem key={index} {...item} />
					))}
					<Button onPress={handleLogout} style={styles.logoutButton}>
						<Typo fontWeight="700" color={colors.neutral900} size={16}>
							Logout
						</Typo>
					</Button>
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
		color: colors.text,
		marginTop: 16
	},
	title: {
		fontSize: 20,
		color: colors.neutral300,
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
		color: colors.text
	},
	logoutButton: {
		width: "60%",
		alignSelf: "center",
		marginVertical: 20
	}
});

export default ProfileScreen;