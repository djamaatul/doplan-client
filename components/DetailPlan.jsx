import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

import { months, weekday } from '../data/date';

export default function DetailPlan(props) {
	const date = new Date(props.date);
	return (
		<Overlay isVisible={props.showDetail} onBackdropPress={props.toggleShowDetail} overlayStyle={styles.overlay}>
			<View style={styles.group}>
				<Text style={{ fontSize: 20, color: '#4CAF50', fontWeight: 'bold' }}>{props.title}</Text>
			</View>
			<View style={styles.date}>
				<Text style={{ color: 'white' }}>
					{`at  ${date.getDate()}  ${months[date.getMonth()]} ${date.getFullYear()}`}
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
		maxWidth: '80%',
		overflow: 'hidden',
	},
	group: {
		padding: 10,
	},
	date: {
		alignSelf: 'baseline',
		paddingVertical: 3,
		paddingHorizontal: 10,
		backgroundColor: 'rgba(0,0,0,0.3)',
		justifyContent: 'center',
		marginLeft: 10,
		borderRadius: 5,
	},
});
