import React from 'react';
import {
	StyleSheet,
	View,
	Image,
	StatusBar,
	TextInput
} from 'react-native';


import { Text } from '../../components/StyledText';
import { Button } from '../../components';
import { Button as Btn } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import AppUtils from '../../utils/AppUtils';
import AuthContext from '../../context/AuthContext';
import * as TokenUtils from "../../utils/TokenUtils";
import PincodeInput from "react-native-pincode-input";
import { fonts } from '../../styles';


class MPinScreen extends React.Component {

	constructor(props) {
		super(props);
		this.confirm = this.confirm.bind(this);
		this.state = {
			pin: "",
			confirmPin: '',
			isCreate: true,
			isMpin: false,
			appPin: ""
		}
		pincodeInput = React.createRef();
	}


	componentDidMount = async () => {
		let data = await TokenUtils.getMpin();
		if (AppUtils.isNotEmpty(data)) {
			this.setState({ isMpin: true, appPin: data });
		}
		console.log("component did mount mpin");
	}


	confirm() {
		const context = this.context;


		let isCreate = this.state.isCreate;
		if (AppUtils.isEmpty(this.state.pin)) {
			alert("Please enter pin");
			return;
		}
		if (this.state.isMpin) {
			if (this.state.pin != this.state.appPin) {
				this.pincodeInput.shake();
				alert("Invalid pin.");
				return;
			}
			context.updateContext({ isSignedIn: true, isLoading: false, isLoginWithMPIN: true });

		} else {
			if (isCreate) {
				this.setState({ isCreate: false });
				return
			}

			if (AppUtils.isEmpty(this.state.confirmPin)) {
				alert("Please enter confirm pin");
				return;
			}

			if (this.state.pin != this.state.confirmPin) {
				alert("Pin and Confirm pin not same.");
				return
			}
			TokenUtils.saveMpin(this.state.pin);
			context.updateContext({ isSignedIn: true, isLoading: false, isLoginWithMPIN: true });
		}

	}

	handleOnPinChange(pin) {
		this.setState({ pin }, () => {
			if (pin.length === 4) {
				this.confirm();
			}
		});
	}

	handleOnConfirmChange(confirmPin) {
		this.setState({ confirmPin }, () => {
			if (confirmPin.length === 4) {
				this.confirm();
			}
		});
	}

	render() {
		const logo = require('../../../assets/images/logo.jpg');

		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor={'transparent'} />
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
					colors={['#0dcaf4', '#5c5dbb']}
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
				{/* <View style={styles.section}>
					<Text size={30} bold style={styles.title}>
						{this.state.isMpin ? "Enter App Screen M-PIN" : "Create M-PIN"}
					</Text>
				</View> */}


				<View style={{ marginTop: 50 }}>
					<View style={styles.section}>
						<Text size={18} bold style={styles.title}>
							{this.state.isMpin ? "Log in with M-PIN" : this.state.isCreate ? "Set new M-PIN" : "Confirm your M-PIN"}
						</Text>
					</View>


					<View style={{ padding: 25 }}>
						<View style={{ paddingBottom: 40, alignItems: 'center' }}>
							{
								this.state.isCreate ?
									// <TextInput
									// 	mode="outlined"
									// 	placeholder="PIN"
									// 	style={styles.textInput}
									// 	keyboardType={'numeric'}
									// 	numeric
									// 	secureTextEntry={true}
									// 	value={this.state.pin}
									// 	onChangeText={(pin) => this.setState({ pin })}
									// 	maxLength={4}
									// />

									<PincodeInput
										ref={pincodeInput => this.pincodeInput = pincodeInput}
										length={4}
										containerStyle={{
											display: "flex",
											width: "100%",
											justifyContent: "center",
										}}
										circleContainerStyle={{
											paddingHorizontal: 50,
										}}
										circleEmptyStyle={{
											borderWidth: 1,
											borderColor: "#424242",
											height: 50,
											width: 50
										}}
										circleFilledStyle={{
											backgroundColor: "#5F58B9",
											height: 50,
											width: 50
										}}
										pin={this.state.pin}
										onTextChange={(pin) => { this.handleOnPinChange(pin) }}
										useNativeDriver={true}
									/>

									:

									// <TextInput mode="outlined"
									// 	placeholder="Confirm PIN"
									// 	style={styles.textInput}
									// 	keyboardType={'numeric'}
									// 	numeric
									// 	secureTextEntry={true}
									// 	value={this.state.confirmPin}
									// 	onChangeText={(confirmPin) => this.setState({ confirmPin })}
									// 	maxLength={4}
									// />
									<PincodeInput
										length={4}
										containerStyle={{
											display: "flex",
											width: "100%",
											justifyContent: "center",
										}}
										circleContainerStyle={{
											paddingHorizontal: 50,
										}}
										circleEmptyStyle={{
											borderWidth: 1,
											borderColor: "#424242",
											height: 50,
											width: 50
										}}
										circleFilledStyle={{
											backgroundColor: "#5F58B9",
											height: 50,
											width: 50
										}}
										pin={this.state.confirmPin}
										onTextChange={(confirmPin) => { this.handleOnConfirmChange(confirmPin) }}
									/>
							}
						</View>

						{/* <View style={{ alignItems: 'center' }}>
						<Button
							large
							style={styles.button}
							caption={this.state.isMpin ? "Submit" : "Create"}
							bgGradientStart='#0dcaf4'
							bgGradientEnd='#5c5dbb'
							onPress={() => {
								this.confirm()
							}}
						/>
					</View> */}
					</View>
				</View>
			</View>
		);
	}
}

MPinScreen.contextType = AuthContext;
export default MPinScreen;


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	input: {
		width: '80%',
		height: 40,
		margin: 12,
	},
	button: {
		height: 60,
		width: '50%'
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
	number: {
		width: 80,
		padding: 10,
		backgroundColor: 'white'
	},
	textInput: {
		width: '50%',
		textAlign: 'center',
		height: 70,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 5
	}

});
