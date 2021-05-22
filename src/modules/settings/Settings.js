import React from "react";
import { StyleSheet, Text, View } from "react-native";

class SettingsScreen extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>Working on Settings</Text>
			</View>
		)
	}

}

export default SettingsScreen;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
});