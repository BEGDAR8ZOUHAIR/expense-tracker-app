import { View, StyleSheet } from 'react-native'
import React from 'react'
import TabBarButton from './TabBarButton';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';

const TabBar = ({ state, descriptors, navigation }: any) => {


	const primaryColor = colors.primary;
	const greyColor = colors.neutral500;
	return (
		<View style={styles.tabbar}>
			{state.routes.map((route: { key: string | number; name: string; params: any; }, index: any) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				if (['_sitemap', '+not-found'].includes(route.name)) return null;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TabBarButton
						key={route.name}
						onPress={onPress}
						onLongPress={onLongPress}
						isFocused={isFocused}
						routeName={route.name}
						color={isFocused ? primaryColor : greyColor}
						label={label}
					/>
				)
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	tabbar: {
		position: 'absolute',
		bottom: 25,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.neutral900,
		marginHorizontal: spacingX._15,
		paddingVertical: spacingY._10,
		borderCurve: 'continuous',
		borderRadius: radius._20,
		shadowColor: colors.white,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.84,
		elevation: 5,
	}
})

export default TabBar