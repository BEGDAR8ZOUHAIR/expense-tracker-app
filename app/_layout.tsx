import { AuthProvider } from '@/contexts/authContext';
import { WalletProvider } from '@/contexts/wallet';
import { Stack } from 'expo-router';
import React from 'react';

const StackLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="(modals)/profileModal" options={{ presentation: 'modal' }} />
			<Stack.Screen name="(transactions)/addTransaction" />

		</Stack>
	)
};


export default function RootLayout() {
	return (
		<AuthProvider>
			<WalletProvider>
				<StackLayout />
			</WalletProvider>
		</AuthProvider>
	);
}