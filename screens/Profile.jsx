import { Text, StyleSheet, View, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default Login = () => {
	return (
		<View style={styles.container}>
			<SafeAreaView></SafeAreaView>
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
