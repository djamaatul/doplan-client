import { useContext, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button, Icon } from 'react-native-elements';

import { API, jsonConfig } from '../api/config';

import { AuthContext } from '../context/AuthContext';

export default Login = ({ navigation }) => {
	const { state, dispatch } = useContext(AuthContext);
	const [form, setForm] = useState({
		email: '',
		password: '',
		phone: '',
	});
	const login = async () => {
		try {
			const response = await API.post('/login', JSON.stringify(form), jsonConfig)
				.then((response) => {
					ToastAndroid.show(response.data.status, ToastAndroid.SHORT);
					dispatch({
						type: 'LOGIN_SUCCESS',
						payload: { token: response.data.data.token },
					});
					navigation.navigate('home');
				})
				.catch((error) => {
					ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleLogin = () => {
		login();
	};
	const handleRegister = () => {
		navigation.navigate('register');
	};
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<View style={styles.banner}>
					<Text style={{ textAlign: 'center', color: 'gray', fontSize: 30, fontWeight: 'bold' }}>
						Welcome to <Text style={{ color: '#4CAF50' }}>Doplan !</Text>
					</Text>
				</View>
				<View>
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
				</View>
				<View style={styles.button}>
					<Button title='Login' onPress={handleLogin} />
				</View>
				<View style={styles.footer}>
					<Text style={{ color: 'gray' }}>Dont have accound ? klik </Text>
					<TouchableOpacity onPress={handleRegister}>
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
	banner: {
		marginBottom: 50,
	},
});
