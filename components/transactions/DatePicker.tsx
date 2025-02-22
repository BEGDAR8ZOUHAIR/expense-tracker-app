import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import { Calendar } from 'react-native-calendars';
import { colors, spacingX } from '@/constants/theme';

interface Props {
	date: Date;
	onSelect: (date: Date) => void;
}

const DatePicker = React.forwardRef<BottomSheetModal, Props>(({ date, onSelect }, ref) => {
	return (
		<BottomSheetModal
			ref={ref}
			index={1}
			snapPoints={['50%', '75%']}
			enablePanDownToClose
		>
			<View style={styles.container}>
				{/* <Calendar
					current={date.toISOString()}
					onDayPress={(day: { timestamp: string | number | Date; }) => {
						onSelect(new Date(day.timestamp));
					}} 
					markedDates={{
						[date.toISOString().split('T')[0]]: {
							selected: true,
							selectedColor: colors.primary,
						},
					}}
					theme={{
						selectedDayBackgroundColor: colors.primary,
						todayTextColor: colors.primary,
						arrowColor: colors.primary,
					}}
				/> */}
			</View>
		</BottomSheetModal>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: spacingX._20,
	},
});

export default DatePicker;