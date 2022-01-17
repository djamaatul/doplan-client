import { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';
import FormPlan from '../components/FormPlan';
import { TouchableOpacity } from 'react-native';

import { API, jsonConfig, setAuthToken } from '../api/config';

import { AuthContext } from '../context/AuthContext';

import Plan from '../components/Plan';

export default function Plans({ navigation, route }) {
	const { state } = useContext(AuthContext);
	const [showForm, setShowForm] = useState(false);

	const [plansSuccess, setPlansSuccess] = useState([]);
	const [plansWaiting, setPlansWaiting] = useState([]);

	const getPlans = async () => {
		try {
			await API.get('/plans', jsonConfig).then((response) => {
				setPlansSuccess(response.data.data.filter((e) => e.status == true));
				setPlansWaiting(response.data.data.filter((e) => e.status == false));
			});
		} catch (error) {}
	};

	useEffect(() => {
		setAuthToken(state.token);
	});
	useEffect(() => {
		getPlans();
	}, []);
	return (
		<View style={styles.container}>
			<SafeAreaView>
				<View style={styles.makePlanContainer}>
					<TouchableOpacity
						style={{
							...styles.makePlanButton,
							borderBottomLeftRadius: showForm ? 0 : 10,
							borderBottomEndRadius: showForm ? 0 : 10,
						}}
						onPress={() => setShowForm(!showForm)}
					>
						<View style={{ justifyContent: 'center' }}>
							<Text style={{ color: 'white' }}>Make Your plan here</Text>
						</View>
						<View>
							<Icon name={!showForm ? 'pluscircleo' : 'minuscircleo'} type='antdesign' color='white' />
						</View>
					</TouchableOpacity>
					{showForm && <FormPlan update={getPlans} />}
				</View>
				<View>
					<FlatList
						data={plansWaiting}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<View>
								<Plan {...item} update={() => getPlans()} />
							</View>
						)}
					/>
					<FlatList
						data={plansSuccess}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<View>
								<Plan {...item} update={() => getPlans()} />
							</View>
						)}
					/>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	makePlanContainer: {
		borderRadius: 10,
	},
	makePlanButton: {
		backgroundColor: '#4CAF50',
		borderTopEndRadius: 10,
		borderTopStartRadius: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
});
