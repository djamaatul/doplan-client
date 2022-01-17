import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import { Text, Button, Icon, CheckBox } from 'react-native-elements';

import DetailPlan from '../components/DetailPlan';
import ModalConfirm from './ModalConfirm';
import EditPlan from '../components/EditPlan';

import { API, jsonConfig } from '../api/config';

export default function Plan(props) {
	const date = new Date();
	const dateStatus = new Date(props.date).getDate() - date.getDate();
	const [check, setCheck] = useState(props.status == true ? true : false);
	const [showDetail, setShowDetail] = useState(false);
	const [showConfirm, setConfirm] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showOption, setShowOption] = useState(false);

	const handleCheck = async () => {
		try {
			await API.patch(
				`/plan/${props.id}`,
				{
					status: check,
				},
				jsonConfig
			)
				.then((response) => {
					props.update();
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		handleCheck();
	}, [check]);

	useEffect(() => {
		props.update();
	}, [showConfirm, showEdit]);

	return (
		<View>
			<TouchableOpacity
				onLongPress={() => setShowOption(true)}
				onPressOut={() => {
					setTimeout(() => {
						setShowOption(false);
					}, 3000);
				}}
				onPress={() => setShowDetail(!showDetail)}
			>
				<View style={styles.planContainer}>
					<View style={{ flexDirection: 'row' }}>
						<CheckBox
							center
							checked={check}
							onPress={() => {
								setCheck(!check);
							}}
							containerStyle={{ padding: 0 }}
						/>
						<View>
							<Text
								style={{
									...styles.title,
									textDecorationLine: props.status == true ? 'line-through' : 'normal',
								}}
							>{`${props.title.slice(0, 26)}${props.title.length > 40 ? '...' : ''}`}</Text>
							<Text
								style={{
									...styles.body,
									textDecorationLine: props.status == true ? 'line-through' : 'normal',
								}}
							>{`${props.body.slice(0, 30)}${props.body.length > 40 ? '...' : ''}`}</Text>
						</View>
					</View>
					{showOption ? (
						<View style={{ flexDirection: 'row' }}>
							<Button
								type='clear'
								icon={<Icon name='edit' color='gray' />}
								onPress={() => setShowEdit(!showEdit)}
							/>
							<Button
								type='clear'
								icon={<Icon name='delete' color='#FF8A80' />}
								onPress={() => setConfirm(!showConfirm)}
							/>
						</View>
					) : (
						<Text
							style={{
								color: 'white',
								backgroundColor: dateStatus > 0 ? '#4CAF50' : '#FFC107',
								borderRadius: 3,
								paddingHorizontal: 5,
							}}
						>{`${dateStatus} day more`}</Text>
					)}
				</View>
			</TouchableOpacity>
			{showDetail && (
				<DetailPlan showDetail={showDetail} toggleShowDetail={() => setShowDetail(!showDetail)} {...props} />
			)}
			{showConfirm && (
				<ModalConfirm showConfirm={showConfirm} toggleConfirm={() => setConfirm(!showConfirm)} id={props.id} />
			)}
			{showEdit && <EditPlan showEdit={showEdit} toggleEdit={() => setShowEdit(!showEdit)} {...props} />}
		</View>
	);
}

const styles = StyleSheet.create({
	planContainer: {
		marginVertical: 10,
		marginHorizontal: 0,
		padding: 0,
		borderRadius: 5,
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
	title: { fontWeight: 'bold', fontSize: 15, color: '#4CAF50' },
	body: { fontWeight: '100', color: 'gray' },
});
