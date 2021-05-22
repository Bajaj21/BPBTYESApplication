import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class ProfileScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}


	render() {
		return (
			<View style={styles.container}>
				<Text>Working on Profile</Text>
			</View>
		);
	}
}

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
});
