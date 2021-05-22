import React from "react";
import { StyleSheet, Text, View } from "react-native";

class AccessWebTokenScreen extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>Working on Access Token</Text>
			</View>
		)
	}

}

export default AccessWebTokenScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
});