import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	StatusBar
} from 'react-native';

import { Text } from '../../components/StyledText';
import { Card, TouchableRipple } from 'react-native-paper';

const iconAudit = require('../../../assets/images/home/audit.png');
const iconClipboard = require('../../../assets/images/home/clipboard.png');
const iconList = require('../../../assets/images/home/list.png');
const iconToDoList = require('../../../assets/images/home/to-do-list.png');

import AppConstant from "../../constants/AppConstant";
import axiosInstance from '../../interceptor/http-interceptor';
import * as TokenUtils from "../../utils/TokenUtils";
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts } from '../../styles';

class HomeScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			userId: 1
		}
	}

	componentDidMount() {
		console.log("component did mount home page");
		//this.getProfile(this.state.userId);
	}


	getProfile = async (param) => {
		console.log("get profile call", param);
		let url = await TokenUtils.getURL();
		axiosInstance.get(url + AppConstant.USER_API + param)
			.then((response) => {
				if (response.data) {
					console.log(response.data);
				}
			}
			).catch(error => {
				if (error.response && error.response.data) {
					Alert.alert('Oops!', error.response.data.message);
				}
			});
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor={'transparent'} />
				<View style={styles.cardContainer}>
					<TouchableRipple style={styles.touchable} onPress={() => { this.props.navigation.navigate('Create Event'); }} rippleColor="rgba(0, 0, 0, .32)" >
						<Card>
							<Card.Actions style={styles.cardAction}>
								<View style={{ padding: 10, width: 130 }}>
									<Image
										source={iconClipboard}
										style={{
											width: 100,
											height: 100
										}}
									/>
								</View>
								<Text color='#000' size={20} style={styles.heading}>Event Register</Text>
							</Card.Actions>
						</Card>
					</TouchableRipple>
					<TouchableRipple style={styles.touchable} onPress={() => { }} rippleColor="rgba(0, 0, 0, .32)" >
						<Card>
							<Card.Actions style={styles.cardAction}>
								<View style={{ padding: 10, width: 130 }}>
									<Image
										source={iconToDoList}
										style={{
											width: 80,
											height: 100
										}}
									/>
								</View>
								<Text color='#000' size={20} style={styles.heading}>Hazard Register</Text>
							</Card.Actions>
						</Card>
					</TouchableRipple>
					<TouchableRipple style={styles.touchable} onPress={() => { }} rippleColor="rgba(0, 0, 0, .32)" >
						<Card>
							<Card.Actions style={styles.cardAction}>
								<View style={{ padding: 10, width: 130 }}>
									<Image
										source={iconAudit}
										style={{ width: 100, height: 100 }}
									/>
								</View>
								<Text color='#000' size={20} style={styles.heading}>Audits & Inspections</Text>
							</Card.Actions>
						</Card>
					</TouchableRipple>
					<TouchableRipple style={styles.touchable} onPress={() => { }} rippleColor="rgba(0, 0, 0, .32)" >
						<Card>
							<Card.Actions style={styles.cardAction}>
								<View style={{ padding: 10, width: 130 }}>
									<Image
										source={iconList}
										style={{ width: 80, height: 100 }}
									/>
								</View>
								<Text color='#000' size={20} style={styles.heading}>Tasks</Text>
							</Card.Actions>
						</Card>
					</TouchableRipple>
				</View>
			</View>
		);
	}
}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center'
	},
	cardContainer: {
		margin: 20
	},
	cardAction: {
		//justifyContent: 'center'
	},
	touchable: {
		marginBottom: 20
	},
	heading: {
		fontFamily: fonts.primaryBold
	}

});
