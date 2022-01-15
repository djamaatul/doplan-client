import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

import authNavigator from './navigations/authNavigator';
import homeNavigator from './navigations/homeNavigator';

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='auth'>
						<Stack.Screen options={{ headerShown: false }} name='auth' component={authNavigator} />
						<Stack.Screen options={{ headerShown: false }} name='home' component={homeNavigator} />
					</Stack.Navigator>
				</NavigationContainer>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
