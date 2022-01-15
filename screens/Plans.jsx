import { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Icon } from 'react-native-elements';
import FormPlan from '../components/FormPlan';
import { TouchableOpacity } from 'react-native';

import { setAuthToken } from '../api/config';
import { AuthContext } from '../context/AuthContext';

export default Login = () => {
	const { state } = useContext(AuthContext);
	const [showForm, setShowForm] = useState(false);
	useEffect(() => {
		setAuthToken(state.token);
	});
	return (
		<ScrollView>
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
							<View>
								<Text style={{ color: 'white' }}>Make Your plan here</Text>
							</View>
							<View>
								<Icon
									name={!showForm ? 'pluscircleo' : 'minuscircleo'}
									type='antdesign'
									color='white'
								/>
							</View>
						</TouchableOpacity>
						{showForm && <FormPlan />}
					</View>
					<View></View>
				</SafeAreaView>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	makePlanContainer: {
		elevation: 3,
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
