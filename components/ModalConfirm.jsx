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
					<Button title='Cancel' buttonStyle={{ backgroundColor: 'gray' }} onPress={props.toggleConfirm} />
					<Button
						title='Confirm'
						buttonStyle={{ marginLeft: 10, backgroundColor: '#EF5350' }}
						onPress={confirm}
					/>
				</View>
			</View>
		</Overlay>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		paddingBottom: 20,
	},
	title: {
		fontSize: 20,
		color: '#4CAF50',
	},
	overlay: {
		width: 150,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});
