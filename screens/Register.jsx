import { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Icon } from 'react-native-elements';

import { API, jsonConfig } from '../api/config';

export default Login = ({ navigation }) => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phone: '',
	});
	const register = async () => {
		try {
			const response = await API.post('/register', JSON.stringify(form), jsonConfig)
				.then((response) => {
					console.log(response);
					ToastAndroid.show('Thanks you,registed Success'.message, ToastAndroid.LONG);
					navigation.goBack();
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleRegister = () => {
		register();
	};
	const handleLogin = () => {
		navigation.goBack();
	};
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View>
					<View style={styles.name}>
						<View style={{ width: '50%' }}>
							<Input
								placeholder='First Name'
								onChangeText={(e) => setForm({ ...form, firstName: e.replace(' ', '') })}
								leftIcon={<Icon name='user' type='feather' color='gray' />}
							/>
						</View>
						<View style={{ width: '50%' }}>
							<Input
								placeholder='Last Name'
								onChangeText={(e) => setForm({ ...form, lastName: e.replace(' ', '') })}
								leftIcon={<Icon name='user' type='feather' style={{ width: 0 }} />}
							/>
						</View>
					</View>
					<Input
						placeholder='Email'
						onChangeText={(e) => setForm({ ...form, email: e.replace(' ', '') })}
						leftIcon={<Icon name='email' color='gray' />}
					/>
					<Input
						secureTextEntry={true}
						onChangeText={(e) => setForm({ ...form, password: e })}
						placeholder='Password'
						leftIcon={<Icon name='lock' color='gray' />}
					/>
					<Input
						placeholder='Phone : +6281234567890'
						importantForAutofill='as'
						keyboardType='numeric'
						onChangeText={(e) => setForm({ ...form, phone: e.replace(' ', '') })}
						leftIcon={<Icon name='phone-enabled' color='gray' />}
					/>
				</View>
				<View style={styles.button}>
					<Button title='Register' onPress={handleRegister} />
				</View>
				<View style={styles.footer}>
					<Text style={{ color: 'gray' }}>Dont have accound ? klik </Text>
					<TouchableOpacity onPress={handleLogin}>
						<Text style={{ color: '#4CAF50' }}>Here</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 40,
		justifyContent: 'center',
		height: '100%',
	},
	button: {
		marginVertical: 5,
	},
	footer: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	name: {
		flexDirection: 'row',
	},
});
