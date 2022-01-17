import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { months } from '../data/date';

import { API, jsonConfig } from '../api/config';

export default function FormPlan(props) {
	const [form, setForm] = useState({
		title: '',
		body: 'I hope this plan be succes!',
	});
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date());
	const [showDate, setShowDate] = useState(false);
	const [showTime, setShowTime] = useState(false);

	const makePlan = async () => {
		try {
			await API.post('/plan', JSON.stringify({ ...form, date: date.getTime() }), jsonConfig)
				.then((response) => {
					ToastAndroid.show(response.data.status, ToastAndroid.SHORT);
					props.update();
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {}
	};
	const handleMakePlan = () => {
		makePlan();
	};
	useEffect(() => {
		setShowDate(false);
	}, [date, time]);
	return (
		<View style={styles.input}>
			<Input placeholder='Type your title plan here' onChangeText={(e) => setForm({ ...form, title: e })} />
			<Text>
				<Button
					buttonStyle={{
						backgroundColor: 'rgba(0,0,0,0.3)',
					}}
					onPress={() => setShowDate(!showDate)}
					icon={<Icon size={20} name='calendar-today' color='white' />}
					title={
						<Text style={{ color: 'white' }}>{`${
							months[date.getMonth()]
						} ${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`}</Text>
					}
				/>
			</Text>
			<View style={{ flexWrap: 'wrap' }}>
				<Input
					placeholder='Description'
					style={{ flexWrap: 'nowrap', flexDirection: 'column' }}
					multiline={true}
					onChangeText={(e) => setForm({ ...form, body: e })}
				/>
			</View>
			<Button title='Make a plan' onPress={handleMakePlan} />
			{showDate && (
				<DateTimePicker
					mode='date'
					onChange={(e, i) => {
						setShowDate(false);
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
						setShowTime(false);
						setTime(i ? i : time);
						date.setHours(time.getHours());
						date.setMinutes(time.getMinutes());
					}}
					value={time}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		backgroundColor: 'white',
		borderBottomEndRadius: 10,
		borderBottomStartRadius: 10,
		padding: 10,
	},
	dateButton: {
		backgroundColor: '#4CAF50',
	},
});
