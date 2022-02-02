import React from 'react';
import { StyleSheet, ToastAndroid, View, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';

import { API } from '../api/config';

export default function DetailPlan(props) {
	const confirm = async () => {
		try {
			await API.delete(`/plan/${props.id}`)
				.then((response) => {
					ToastAndroid.show(response.data.status, ToastAndroid.SHORT);
					props.toggleConfirm();
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Overlay isVisible={props.showConfirm} onBackdropPress={props.toggleConfirm}>
			<View style={styles.overlay}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Are you sure ?</Text>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title='Cancel'
						type='clear'
						titleStyle={{ color: 'rgba(0,0,0,0.4)' }}
						onPress={props.toggleConfirm}
					/>
					<Button title='Confirm' type='clear' onPress={confirm} />
				</View>
			</View>
		</Overlay>
	);
}

const styles = StyleSheet.create({
	overlay: {
		width: 150,
		justifyContent: 'space-between',
	},
	titleContainer: {
		padding: 0,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#4CAF50',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 40,
	},
});
