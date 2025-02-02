import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext';

const _layout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}></Stack>
	)
};

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
			</Stack>
		</AuthProvider>
	);
}