import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Overlay, Input, Button, Icon } from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';

import { months } from '../data/date';

import { API, jsonConfig } from '../api/config';

export default function DetailPlan(props) {
	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);
	const [date, setDate] = useState(new Date(props.date));
	const [time, setTime] = useState(new Date(props.date));
	const [form, setForm] = useState({
		title: props.title,
		body: props.body,
	});
	const edit = async () => {
		try {
			await API.patch(
				`/plan/${props.id}`,
				{
					...form,
					date,
				},
				jsonConfig
			)
				.then((response) => {
					console.log({ ...form, date });
					ToastAndroid.show(response.data.status, ToastAndroid.SHORT);
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {
			console.log(date);
		}
	};
	const handleEdit = () => {
		edit();
		props.toggleEdit();
	};
	return (
		<Overlay isVisible={props.showEdit} onBackdropPress={props.toggleEdit}>
			<View style={styles.container}>
				<View>
					<Input
						placeholder='title'
						defaultValue={props.title}
						multiline={true}
						onChangeText={(e) => {
							setForm({
								...form,
								title: e,
							});
						}}
					/>
					<Input
						placeholder='body'
						defaultValue={props.body}
						multiline={true}
						onChangeText={(e) => {
							setForm({
								...form,
								body: e,
							});
						}}
					/>
				</View>
				<View style={styles.date}>
					<Button
						onPress={() => setShowDate(!showDate)}
						buttonStyle={{
							backgroundColor: 'rgba(0,0,0,0.3)',
							justifyContent: 'flex-start',
						}}
						icon={<Icon size={20} name='calendar-today' color='white' />}
						title={
							<Text style={{ color: 'white', marginLeft: 5 }}>{`${
								months[date.getMonth()]
							} ${date.getDate()} at ${time.getHours()}:${time.getMinutes()}`}</Text>
						}
					/>
				</View>
				<View style={styles.buttonContainer}>
					<Button title='Cancel' type='clear' titleStyle={{ color: 'gray' }} onPress={props.toggleEdit} />
					<Button title='Oke' type='clear' onPress={handleEdit} />
				</View>
			</View>
			{showDate && (
				<DateTimePicker
					mode='date'
					onChange={(e, i) => {
						setShowDate(!showDate);
						setDate(i ? i : date);
						setShowTime(!showTime);
					}}
					value={date}
				/>
			)}
			{showTime && (
				<DateTimePicker
					mode='time'
					onChange={(e, i) => {
						setShowTime(!showTime);
						setTime(i ? i : time);
						date.setHours(time.getHours());
						date.setMinutes(time.getMinutes());
					}}
					value={time}
				/>
			)}
		</Overlay>
	);
}
const styles = StyleSheet.create({
	container: { display: 'flex', width: 200 },
	buttonContainer: {
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginTop: 10,
	},
	date: {
		paddingHorizontal: 10,
		marginVertical: 10,
	},
});
