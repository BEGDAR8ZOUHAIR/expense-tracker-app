import React from 'react'
import { Stack } from 'expo-router'
import { AuthProvider } from '@/contexts/authContext';
import { WalletProvider } from '@/contexts/wallet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<BottomSheetModalProvider>
				<AuthProvider>
					<WalletProvider>
						<StackLayout />
					</WalletProvider>
				</AuthProvider>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}