import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const _layout = () => {
	return (
		<Tabs screenOptions={{ headerShown: false }}>
			<Tabs.Screen name="index" />
			<Tabs.Screen name="wallet" />
			<Tabs.Screen name="profile" />
			<Tabs.Screen name="statistics" />
		</Tabs>
	)
}

export default _layout

const styles = StyleSheet.create({})