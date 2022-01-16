import { useContext, useEffect } from 'react';

import { Text, StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../context/AuthContext';

export default function Profile({ navigation }) {
	const {
		state: { profile },
		dispatch,
	} = useContext(AuthContext);
	return (
		<View style={styles.container}>
			<View
				style={{
					width: '100%',
					height: '100%',
					justifyContent: 'space-between',
				}}
			>
				<View style={styles.profile}>
					<View style={styles.avatar}>
						<Icon name='person' size={50} color='white' />
					</View>
					<View style={styles.biodata}>
						<Text style={{ color: 'white', fontSize: 20 }}>{`${profile?.firstName ?? ''} ${
							profile?.lastName ?? ''
						}`}</Text>
						<Text style={{ color: 'white', fontSize: 15 }}>{profile?.phone}</Text>
					</View>
				</View>
				<View style={{ padding: 20 }}>
					<Button
						title='Logout'
						onPress={() => {
							dispatch({
								type: 'LOGOUT',
							});
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profile: {
		backgroundColor: '#4CAF50',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		alignItems: 'center',
		padding: 40,
	},
	avatar: { borderRadius: 100, backgroundColor: 'rgba(225,225,225,0.5)', padding: 10 },
	biodata: {
		marginTop: 20,
		alignItems: 'center',
	},
});
