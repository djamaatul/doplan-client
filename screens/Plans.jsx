import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Button } from 'react-native-elements';

export default Login = () => {
	return (
		<View style={styles.container}>
			<SafeAreaView>
				<View style={styles.input}>
					<Input placeholder='Type your title plan here' />
					<Input placeholder='Description' />
					<Button title='Add Plan' />
				</View>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	input: {
		backgroundColor: 'white',
		borderRadius: 5,
		elevation: 5,
		padding: 10,
	},
});
