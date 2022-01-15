import { useState } from 'react';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Icon } from 'react-native-elements';

import { API, jsonConfig } from '../api/config';

export default Login = ({ navigation }) => {
	const [form, setForm] = useState({
		email: '',
		password: '',
		phone: '',
	});
	const login = async () => {
		try {
			const response = await API.post('/login', JSON.stringify(form), jsonConfig)
				.then((response) => {
					console.log(response);
					navigation.navigate('home');
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleLogin = async () => {
		login();
	};
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.banner}></View>
				<Input
					placeholder='Email or phone'
					onChangeText={(e) => setForm({ ...form, email: e.replace(' ', ''), phone: e.replace(' ', '') })}
					leftIcon={<Icon name='email' color='gray' />}
				/>
				<Input
					secureTextEntry={true}
					onChangeText={(e) => setForm({ ...form, password: e })}
					placeholder='Password'
					leftIcon={<Icon name='lock' color='gray' />}
				/>
				<Button title='Login' onPress={handleLogin} />
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		justifyContent: 'center',
		height: '100%',
	},
});
