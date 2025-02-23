// components/transactions/AnimatedTabs.tsx
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import { colors } from '@/constants/theme';
import Typo from '../Typo';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width * 0.4;

interface AnimatedTabsProps {
	selectedTab: 'income' | 'expense';
	onTabChange: (tab: 'income' | 'expense') => void;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ selectedTab, onTabChange }) => {
	const translateX = useSharedValue(0);

	useEffect(() => {
		translateX.value = withSpring(selectedTab === 'income' ? 0 : TAB_WIDTH);
	}, [selectedTab]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.slider, animatedStyle]} />
			<View style={styles.tabsContainer}>
				<TouchableOpacity
					style={styles.tab}
					onPress={() => onTabChange('income')}
				>
					<Typo
						color={selectedTab === 'income' ? colors.white : colors.neutral600}
						fontWeight="600"
					>
						Income
					</Typo>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tab}
					onPress={() => onTabChange('expense')}
				>
					<Typo
						color={selectedTab === 'expense' ? colors.white : colors.neutral600}
						fontWeight="600"
					>
						Expense
					</Typo>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		height: 48,
		backgroundColor: colors.neutral100,
		borderRadius: 24,
		flexDirection: 'row',
		marginHorizontal: 20,
		marginBottom: 20,
	},
	tabsContainer: {
		flexDirection: 'row',
		width: '100%',
	},
	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
	slider: {
		position: 'absolute',
		width: '50%',
		height: '100%',
		backgroundColor: colors.primary,
		borderRadius: 24,
	},
});

export default AnimatedTabs;