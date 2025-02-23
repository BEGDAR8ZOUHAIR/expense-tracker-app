import React from 'react';
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Typo from '@/components/Typo';
import { colors, spacingX } from '@/constants/theme';
import { horizontalScale, verticalScale } from '@/utils/styling';

interface FormField {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	onPress: () => void;
}

interface TransactionFormProps {
	formFields: FormField[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({ formFields }) => {
	const renderItem = ({ item }: { item: FormField }) => (
		<TouchableOpacity
			style={styles.formItem}
			onPress={item.onPress}
		>
			<Ionicons
				name={item.icon}
				size={30}
				color={colors.neutral800}
				style={styles.icon}
			/>
			<Typo style={styles.label}>{item.label}</Typo>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={formFields}
				renderItem={renderItem}
				keyExtractor={(item) => item.label}
				numColumns={5}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: spacingX._10,
	},
	formItem: {
		flexDirection: 'column',
		alignItems: 'center',
		width: '18%',
		marginHorizontal: '1%',
	},
	icon: {
		marginBottom: verticalScale(8),
	},
	label: {
		textAlign: 'center',
		fontSize: 12,
		lineHeight: 16,
	},
});

export default TransactionForm;