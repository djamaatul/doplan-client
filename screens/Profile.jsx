import { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { AuthContext } from '../context/AuthContext';
import { API } from '../api/config';

export default function Profile({ navigation }) {
	const {
		state: { profile },
		dispatch,
	} = useContext(AuthContext);
	const [plansSuccess, setPlansSuccess] = useState([]);
	const [plansWaiting, setPlansWaiting] = useState([]);
	let progress = Math.ceil((plansSuccess?.length / (plansWaiting?.length + plansSuccess.length)) * 100);

	const getPlans = async () => {
		try {
			await API.get('/plans').then((response) => {
				setPlansSuccess(response.data.data.filter((e) => e.status == true));
				setPlansWaiting(response.data.data.filter((e) => e.status == false));
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getPlans();
	}, []);
	return (
		<View style={styles.container}>
			<View
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'space-between',
				}}
			>
				<View style={styles.profile}>
					<View style={styles.avatar}>
						<Icon name='person' size={50} color='white' />
					</View>
					<View style={styles.biodata}>
						<Text style={{ color: 'white', fontSize: 20 }}>{`${profile?.firstName ?? ''} ${
							profile?.lastName ?? ''
						}`}</Text>
						<Text style={{ color: 'white', fontSize: 15 }}>{profile?.phone}</Text>
					</View>
				</View>
				<View style={styles.status}>
					<Text
						style={{
							fontSize: 30,
							fontWeight: 'bold',
							color: '#607D8B',
							marginVertical: 10,
						}}
					>
						In progress ..
					</Text>
					<View
						style={{
							backgroundColor: '#A5D6A7',
							height: 30,
							borderRadius: 10,
							position: 'relative',
						}}
					>
						<View
							style={{
								backgroundColor: '#4CAF50',
								width: `${progress}%`,
								height: 30,
								borderRadius: 10,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25 }}>{`${
								plansSuccess.length
							}/${plansWaiting.length + plansSuccess.length}`}</Text>
						</View>
					</View>
				</View>
				<View style={{ padding: 20 }}>
					<Button
						title='Logout'
						onPress={() => {
							dispatch({
								type: 'LOGOUT',
							});
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profile: {
		backgroundColor: '#4CAF50',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		alignItems: 'center',
		padding: 40,
	},
	avatar: { borderRadius: 100, backgroundColor: 'rgba(225,225,225,0.5)', padding: 10 },
	biodata: {
		marginTop: 20,
		alignItems: 'center',
	},
	status: { flex: 1, padding: 10, justifyContent: 'center' },
});
