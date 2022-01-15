import { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

import AuthContext from './context/AuthContext.js';

import authNavigator from './navigations/authNavigator';
import homeNavigator from './navigations/homeNavigator';

export default function App() {
	const theme = {
		colors: {
			primary: '#4CAF50',
			dark: '#2E7D32',
		},
		Input: {
			style: {
				fontSize: 13,
			},
		},
		Button: {
			titleStyle: {
				fontSize: 15,
			},
		},
	};

	return (
		<SafeAreaProvider>
			<AuthContext>
				<ThemeProvider theme={theme}>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='auth'>
							<Stack.Screen options={{ headerShown: false }} name='auth' component={authNavigator} />
							<Stack.Screen options={{ headerShown: false }} name='home' component={homeNavigator} />
						</Stack.Navigator>
					</NavigationContainer>
				</ThemeProvider>
			</AuthContext>
		</SafeAreaProvider>
	);
}
