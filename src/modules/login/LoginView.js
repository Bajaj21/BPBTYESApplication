import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Alert, ScrollView, StatusBar } from 'react-native';

import { Text } from '../../components/StyledText';
import { Button } from '../../components';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AppUtils from "../../utils/AppUtils";
import API from '../../interceptor/login';
import AppConstant from "../../constants/AppConstant";
import * as TokenUtils from "../../utils/TokenUtils";
import Spinner from 'react-native-loading-spinner-overlay';
import AuthContext from '../../context/AuthContext';
import { fonts } from '../../styles';

export class LoginScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			url: 'https://', //https://demo.bpbytes.com.au
			username: '', //admin@bpbytes.com.au
			password: '', //BP@Bytes#123
			loading: false,
		}
	}

	sign() {
		const context = this.context;
		if (AppUtils.isEmpty(this.state.url)) {
			alert("Please enter url");
			return
		} else if (AppUtils.isEmpty(this.state.username)) {
			alert("Please enter username");
			return
		} else if (AppUtils.isEmpty(this.state.password)) {
			alert("Please enter password");
			return
		} else {
			this.setState({ loading: true });
			let data = {
				"grant_type": AppConstant.GRANT_TYPE,
				"client_id": AppConstant.CLIENT_ID,
				"client_secret": AppConstant.CLIENT_SECRET,
				"username": this.state.username,
				"password": this.state.password
			}
			API.login(data, this.state.url).then(
				response => {
					if (response.data) {
						this.setState({ loading: false });
						TokenUtils.saveToken(response.data);
						TokenUtils.setURL(this.state.url);
						//context.updateContext({ isSignedIn: true, isLoading: false });
						this.props.navigation.navigate('MPIN');
					}
				}
			).catch(error => {
				this.setState({ loading: false });
				if (error.message === 'Network Error') {
					Alert.alert('Oops!', 'Server not response.');
				} else if (error.response.status === 404) {
					Alert.alert('Oops!', 'Invalid url.');
				} else if (error.response != null && error.response.data) {
					Alert.alert('Oops!', error.response.data.message);
				}
			});
		}
	}

	render() {
		const logo = require('../../../assets/images/logo.jpg');

		return (
			<View style={styles.container}>
				{/* <StatusBar
					animated={true}
					backgroundColor="#09CFF7"
				// barStyle={statusBarStyle}
				// showHideTransition={statusBarTransition}
				// hidden={hidden} 
				/> */}

				<StatusBar translucent={true} backgroundColor={'transparent'} />


				<ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode="on-drag" style={{ backgroundColor: "#fff" }}>
					<Spinner
						visible={this.state.loading}
					/>
					<LinearGradient
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						colors={['#09CFF7', '#5F58B9']}
						style={styles.linearGradient}>
						<View style={{ height: 100 }}></View>
					</LinearGradient>

					<View style={styles.imageContainer}>
						<Image
							resizeMode='stretch'
							style={styles.tinyLogo}
							source={logo}

						/>
					</View>
					<View style={styles.section}>
						<Text size={30} bold style={styles.title}>
							Sign In
                   </Text>
					</View>

					<View style={{ padding: 25 }}>
						<View style={{ paddingBottom: 15 }}>
							<TextInput
								mode="outlined"
								label="URL"
								value={this.state.url}
								onChangeText={(url) => this.setState({ url })}
								keyboardType="email-address"
								theme={
									{
										fonts: {
											regular: {
												fontFamily: fonts.primaryRegular
											}
										}
									}
								}
							/>
							<Text style={styles.hint}>https://demo.bpbytes.com.au</Text>
						</View>

						<View style={{ paddingBottom: 15 }}>
							<TextInput
								mode="outlined"
								label="Username"
								value={this.state.username}
								onChangeText={(username) => this.setState({ username })}
								// theme={{ fonts: { fontFamily: fonts.primary } }}
								theme={
									{
										fonts: {
											regular: {
												fontFamily: fonts.primaryRegular
											}
										}
									}
								}
							/>
						</View>

						<View style={{ paddingBottom: 20 }}>
							<TextInput
								mode="outlined"
								label="Password"
								secureTextEntry={true}
								value={this.state.password}
								onChangeText={(password) => this.setState({ password })}
								theme={
									{
										fonts: {
											regular: {
												fontFamily: fonts.primaryRegular
											}
										}
									}
								}
							/>
						</View>
						<View>
							<Button
								large
								style={styles.button}
								caption="Sign In"
								bgGradientStart='#09CFF7'
								bgGradientEnd='#5F58B9'
								onPress={() => { this.sign() }}
							/>

							<TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
								<Text style={{ color: '#BEBEBE', fontFamily: fonts.primaryBold }}>Forgot Password</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView >
			</View>
		);
	}
}

LoginScreen.contextType = AuthContext;
export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	input: {
		width: '80%',
		height: 40,
		margin: 12,
	},
	button: {
		height: 60
	},
	tinyLogo: {
		width: "100%",
		height: 60,
		aspectRatio: 5,
	},
	imageContainer: {
		marginTop: -30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	section: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20
	},
	title: {
		color: '#5c5dbb',
		fontFamily: fonts.primaryBold
	},
	hint: {
		fontSize: 10,
		color: '#BEBEBE'
	}

});
