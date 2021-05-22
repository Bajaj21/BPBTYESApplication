import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '../../components';
import { TextInput, Button as Btn, RadioButton } from 'react-native-paper';
import moment from 'moment';
import * as TokenUtils from "../../utils/TokenUtils";
import AppConstant from "../../constants/AppConstant";
import axiosInstance from '../../interceptor/http-interceptor';
import AppUtils from '../../utils/AppUtils';

import { Picker } from '@react-native-picker/picker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Spinner from 'react-native-loading-spinner-overlay';
import { fonts } from '../../styles';

export class EventCreateScreen extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			fieldList: {},
			loading: false,
		}
	}

	componentDidMount = () => {
		this.getfield();
	}


	getfield = async () => {
		console.log("================call method get field==================");
		let url = await TokenUtils.getURL();
		axiosInstance.get(url + AppConstant.EVENT_FIELD_API).then((response) => {
			if (response.data && response.data.data) {
				this.setState({ fieldList: response.data.data.attributes });
			}
		}).catch(error => {
			if (error.response && error.response.data) {
				Alert.alert('Oops!', error.response.data.message);
			}
		});
	}

	//------------------------DATE MEHTODS---------------------
	toggleDatePicker = (key, isVisible, value) => {
		let fieldList = this.state.fieldList;
		let field = fieldList[key];
		field.isVisible = isVisible;
		if (value) {
			field.value = value;
		}
		this.setState({ fieldList });
	};

	onChangeDate = (key, d) => {
		if (d != undefined && d != null) {
			this.toggleDatePicker(key, false, new Date(d));
		} else
			this.toggleDatePicker(key, false);
	}
	//---------------------------------------------------------


	setOpen = (open, key) => {
		let fieldList = this.state.fieldList;
		Object.keys(fieldList).map((keyName, keyIndex) => {
			let field = fieldList[keyName];
			field.open = false;
			if (keyName === key) {
				field.open = open;
			}
		});
		this.setState({ fieldList });
	}



	//------------------------------SET VALUE IN EVERY FIELD-------------------------------------
	setValue = (key, value) => {
		let fieldList = this.state.fieldList;
		let field = fieldList[key];
		field.value = value;
		this.setState({ fieldList });
	}
	//-------------------------------------------------------------------------------------------




	onSubmit = async () => {
		console.log("on submit call");
		let fieldList = this.state.fieldList;
		let obj = {};
		let isError = false;
		Object.keys(fieldList).map((key) => {

			let field = fieldList[key];
			console.log(key, field.value);

			if (!isError && field.required && field.value == null) {
				alert(field.label + " is required.");
				isError = true;
				return;
			}
			obj[key] = field.value;
			if (field.type === 'multienum') {
				let val = '';
				if (field.value) {
					field.value.map((v) => {
						val = val + v + ",";
					});
				}
				obj[key] = val;
			}
		});
		if (!isError && Object.keys(obj).length != 0) {
			console.log("===========call apis================");
			let url = await TokenUtils.getURL();
			let data = {
				"data": {
					"type": "bp_EventRegister",
					"attributes": obj
				}
			}
			console.log("final data", data);
			this.setState({ loading: true });
			axiosInstance.post(url + AppConstant.EVENT_ADD_API, data).then((response) => {
				if (response.data && response.data.data) {
					this.setState({ loading: false });
					alert("Event save successfully.");
					this.props.navigation.navigate('Home');
				}
			}).catch(error => {
				this.setState({ loading: false });
				console.log(error.response.data);
				if (error.response && error.response.data && error.response.data.errors) {
					Alert.alert('Oops!', error.response.data.errors.detail);
				} else if (error.response && error.response.data) {
					Alert.alert('Oops!', error.response.data.message);
				}
			});
		}
	}

	render() {
		const { fieldList } = this.state;
		return (
			<View style={styles.container}>
				<ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode="on-drag">
					<Spinner
						visible={this.state.loading}
					/>
					<View style={{ padding: 25 }}>
						{
							AppUtils.isNotEmpty(fieldList) ?
								Object.keys(fieldList).map((keyName, keyIndex) => {
									let field = fieldList[keyName];
									let option = AppUtils.convertToDropdownOption(field.options);
									return (
										<View key={keyName}>
											{/* multiple select */}
											{
												field.type === 'multienum' ?
													<View style={{ paddingBottom: 15 }} key={keyName}>
														<Text style={styles.textHeading}>
															{field.label}
															{field.required ? <Text style={styles.mandatory}>*</Text> : <></>}
														</Text>
														{/* <DropDownPicker
															open={field.open}
															value={field.value}
															items={option}
															setOpen={(open) => this.setOpen(open, keyName)}
															//setValue={(callback) => this.setValue(callback, keyName)}
															setValue={(callback) =>
																this.setState(state => (this.state.fieldList[keyName].value = callback(state.value)))
															}
															multiple={true}
															zIndex={20000}
															listMode="SCROLLVIEW"
															mode="BADGE"
															searchable={true}
															placeholder={field.label}
															style={{
																borderColor: '#5F58B9'
															}}
														/> */}


														<View style={{ borderWidth: 1, borderColor: '#5F58B9', borderRadius: 5 }}>
															<SectionedMultiSelect
																items={option}
																IconRenderer={Icon}
																uniqueKey="value"
																selectText={""}
																showDropDowns={true}
																onSelectedItemsChange={(itemValue) => this.setValue(keyName, itemValue)}
																selectedItems={field.value}
																searchPlaceholderText={"Search " + field.label}
																displayKey="label"
																showCancelButton={true}
																styles={{ chipText: { fontFamily: fonts.primaryRegular } }}
																itemFontFamily={{ fontFamily: fonts.primaryRegular }}
																searchTextFontFamily={{ fontFamily: fonts.primaryRegular }}
																confirmFontFamily={{ fontFamily: fonts.primaryRegular }}

															/>
														</View>
													</View> : <></>
											}

											{/* Single Select */}
											{
												(field.type === 'enum' || field.type === 'dynamicenum'  || field.type === 'relate') ?
													<View style={{ paddingBottom: 15 }} key={keyName}>
														<Text style={styles.textHeading}>{field.label}
															{field.required ? <Text style={styles.mandatory}>*</Text> : <></>}
														</Text>
														{/* <DropDownPicker
															open={field.open}
															value={field.value}
															items={option}
															setOpen={(open) => this.setOpen(open, keyName)}
															setValue={(callback) =>
																this.setState(state => (this.state.fieldList[keyName].value = callback(state.value)))
															}
															zIndex={10000}
															listMode="SCROLLVIEW"
															mode="BADGE"
															searchable={false}
															placeholder={field.label}
															style={{
																borderColor: '#5F58B9'
															}}
														/> */}

														<View style={{ borderWidth: 1, borderColor: '#5F58B9', borderRadius: 5 }}>
															<Picker
																//itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily: "Ebrima", fontSize: 17 }}
																textStyle={{ fontFamily: fonts.primaryRegular }}
																itemStyle={{ fontFamily: fonts.primaryRegular }}
																style={{ fontFamily: fonts.primaryRegular }}

																mode="dropdown"
																selectedValue={field.value}
																onValueChange={(itemValue) =>
																	this.setValue(keyName, itemValue)
																}>

																<Picker.Item style={{ color: "grey" }} enabled={false} label={""} value="" />
																{
																	option.map((op) => {
																		return <Picker.Item label={op.label} value={op.value}
																			fontFamily={fonts.primaryRegular} />
																	})
																}
															</Picker>
														</View>
													</View> : <></>
											}


											{/* TextBox */}
											{
												field.type === 'text' ?
													<View style={{ paddingBottom: 15 }} key={keyName}>
														<Text style={styles.textHeading}>{field.label}
															{field.required ? <Text style={styles.mandatory}>*</Text> : <></>}
														</Text>
														<TextInput
															numberOfLines={4}
															mode="outlined"
															// label={field.label}
															multiline
															value={field.value}
															onChangeText={(value) => this.setValue(keyName, value)}
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
													</View> : <></>
											}

											{/* Date picker */}
											{
												field.type === 'datetimecombo' ?
													<View style={{ marginBottom: 15 }} key={keyName}>
														{field.isVisible && (
															<DateTimePicker
																testID="dateTimePicker"
																value={field.value ? field.value : new Date()}
																mode={'datetime'}
																is24Hour={true}
																display="default"
																onChange={(e, date) => { this.onChangeDate(keyName, date) }}
															/>
														)}
														<Text style={styles.textHeading}>{field.label}
															{field.required ? <Text style={styles.mandatory}>*</Text> : <></>}
														</Text>
														{/* blank text */}
														<Btn mode="outlined"
															style={styles.dateBtn}
															onPress={() => this.toggleDatePicker(keyName, true)}
															color="#000" uppercase={false}>
															<Text style={{ fontFamily: fonts.primaryRegular }}>{field.value ? moment(field.value).format('DD-MMM-YYYY hh:mm A') :
																"                                                             "}</Text>
														</Btn>
													</View> : <></>
											}



											{/* Text box single line */}
											{
												field.type === 'varchar' ?
													<View style={{ paddingBottom: 15 }} key={keyName}>
														<Text style={styles.textHeading}>{field.label}
															{field.required ? <Text style={styles.mandatory}>*</Text> : <></>}
														</Text>
														<TextInput
															mode="outlined"
															// label={field.label}
															value={field.value}
															onChangeText={(value) => this.setValue(keyName, value)}
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
													: <></>
											}

											{/* Radio button */}
											{
												field.type === 'radioenum' ?
													<View style={{ paddingBottom: 15 }} key={keyName}>
														<Text style={styles.textHeading}>{field.label}
															{field.required ? <Text style={styles.mandatory}>*</Text> : <></>}
														</Text>
														<RadioButton.Group onValueChange={value => this.setValue(keyName, value)}
															value={field.value}
														>
															<View style={{ flexDirection: 'row', alignItems: 'center' }}>
																<RadioButton value="Yes" />
																<View><Text style={{ fontFamily: fonts.primaryRegular }}>Yes</Text></View>
															</View>
															<View style={{ flexDirection: 'row', alignItems: 'center' }}>
																<RadioButton value="No" />
																<Text style={{ fontFamily: fonts.primaryRegular }}>No</Text>
															</View>
														</RadioButton.Group>
													</View> : <></>
											}
										</View>
									)
								})
								:
								<View style={{ margin: 20, alignItems: 'center' }}><Text style={{ fontFamily: fonts.primaryBold }}>No field found.</Text></View>
						}
						{
							AppUtils.isNotEmpty(fieldList) ?
								<View style={{ paddingBottom: 15 }}>
									<Button
										large
										style={styles.button}
										caption="Create Event"
										bgGradientStart='#09CFF7'
										bgGradientEnd='#5F58B9'
										onPress={() => { this.onSubmit() }}
									/>
								</View>
								: <></>
						}
					</View>
				</ScrollView>
			</View>
		);
	}
}

export default EventCreateScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	button: {
		height: 60
	},
	textHeading: {
		marginBottom: 5,
		color: '#5F58B9',
		fontFamily: fonts.primaryBold
	},
	mandatory: {
		color: 'red',
		fontSize: 10
	},
	dateBtn: {
		borderWidth: 1,
		borderColor: '#5F58B9',
		height: 55,
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '100%',
	}
});
