import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createStackNavigator();
function authNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen options={{ headerShown: false }} name='login' component={Login} />
			<Stack.Screen name='register' component={Register} />
		</Stack.Navigator>
	);
}

export default authNavigator;
