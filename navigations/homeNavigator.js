import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Plans from '../screens/Plans';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function authNavigator() {
	return (
		<Tab.Navigator>
			<Tab.Screen options={{ headerShown: false }} name='Plans' component={Plans} />
			<Tab.Screen options={{ headerShown: false }} name='Profiles' component={Profile} />
		</Tab.Navigator>
	);
}

export default authNavigator;
