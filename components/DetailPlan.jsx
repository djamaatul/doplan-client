import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

import { months, weekday } from '../data/date';

export default function DetailPlan(props) {
	const date = new Date();
	const datePlan = new Date(props.date);
	const dateStatus = datePlan.getDate() - date.getDate();
	return (
		<Overlay isVisible={props.showDetail} onBackdropPress={props.toggleShowDetail} overlayStyle={styles.overlay}>
			<View style={styles.group}>
				<Text style={{ fontSize: 15, color: '#4CAF50', fontWeight: 'bold' }}>{props.title}</Text>
			</View>
			<View style={styles.date}>
				<Text
					style={{
						color: 'white',
						backgroundColor: 'rgba(0,0,0,0.3)',
						borderRadius: 3,
						paddingHorizontal: 5,
					}}
				>
					{`at  ${datePlan.getDate()}  ${months[datePlan.getMonth()]} ${datePlan.getFullYear()}`}
				</Text>
				<Text
					style={{
						marginLeft: 5,
						color: 'white',
						backgroundColor: dateStatus > 0 ? '#FFC107' : '#66BB6A',
						borderRadius: 3,
						paddingHorizontal: 5,
					}}
				>
					{dateStatus > 0 ? `${dateStatus} day more` : `${dateStatus * -1} day ago`}
				</Text>
			</View>
			<View style={styles.group}>
				<Text style={{ color: 'gray' }}>{props.body}</Text>
			</View>
		</Overlay>
	);
}
const styles = StyleSheet.create({
	overlay: {
		width: '90%',
		overflow: 'hidden',
		paddingBottom: 20,
	},
	group: {
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	date: {
		paddingHorizontal: 10,
		flexDirection: 'row',
	},
});
