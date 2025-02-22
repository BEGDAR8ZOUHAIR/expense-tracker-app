import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar'

const _layout = () => {
	return (
		<Tabs tabBar={props => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="wallet" />
			<Tabs.Screen name="statistics" />
			<Tabs.Screen name="profile" />
		</Tabs>
	)
}

export default _layout