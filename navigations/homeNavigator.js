import { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';

import Plans from '../screens/Plans';
import Profile from '../screens/Profile';

import { AuthContext } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

function authNavigator({ navigation }) {
	const { state } = useContext(AuthContext);

	useEffect(() => {
		if (!state.isLogin) {
			navigation.replace('auth');
		}
	});
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: '#4CAF50',
				tabBarIcon: ({ focused, color }) => {
					let icon;
					if (route.name === 'Plans') {
						icon = focused ? 'playlist-check' : 'playlist-check';
					} else if (route.name === 'Profile') {
						icon = focused ? 'account' : 'account-outline';
					}

					return <Icon name={icon} type='material-community' size={28} color={color} />;
				},
				tabBarHideOnKeyboard: true,
			})}
		>
			<Tab.Screen options={{ headerShown: false }} name='Plans' component={Plans} />
			<Tab.Screen options={{ headerShown: false }} name='Profile' component={Profile} />
		</Tab.Navigator>
	);
}

export default authNavigator;
