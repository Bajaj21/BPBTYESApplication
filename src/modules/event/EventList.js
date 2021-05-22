import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export class EventListScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}


	render() {
		return (
			<View style={styles.container}>
				<Text>Working on Event List </Text>
			</View>
		);
	}
}

export default EventListScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
});
