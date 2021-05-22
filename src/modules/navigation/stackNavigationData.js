import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';

import HomeScreen from '../home/HomeViewContainer';
import ProfileScreen from '../profile/Profile';
import SettingsScreen from '../settings/Settings';
import AccessWebTokenScreen from '../accessWebToken/AcessWebToken';
import EventCreateScreen from '../event/EventCreate';
import EventListScreen from '../event/EventList';
import QrScanScreen from '../qrscandashboard/QrScanDashboard'
import ScanQRScreen from '../scanqr/ScanQR'
import HistoryScreen from '../history/History'
import { colors, fonts } from '../../styles';
// import QrScan from '../qrscan/QrScan';
const TITLE_OFFSET_CENTER_ALIGN = Platform.OS === 'ios' ? 70 : 56;
const TITLE_OFFSET_LEFT_ALIGN = Platform.OS === 'ios' ? 20 : 56;

const headerLeftComponent = (props) => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{ paddingHorizontal: 16, paddingVertical: 12, }} >
			<View style={{ flexDirection: 'row', color: '#fff', alignItems: 'center' }}>
				<Image
					source={require('../../../assets/images/icons/arrow-back.png')}
					resizeMode="contain"
					style={{ height: 20, }} />
				<View style={{ marginLeft: 5 }}><Text style={{ color: '#fff', fontFamily: fonts.primaryBold }}>Back</Text></View>
			</View>
		</TouchableOpacity>
	)
}

const headerBackground = require('../../../assets/images/topBarBg.png');

const StackNavigationData = [
	{
		name: 'Home',
		component: HomeScreen,
		headerLeft: null,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Profile',
		component: ProfileScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Settings',
		component: SettingsScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Qr Scan',
		component: QrScanScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'ScanQR',
		component: ScanQRScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},

	{
		name: 'History',
		component: HistoryScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},

	{
		name: 'Access Web Version',
		component: AccessWebTokenScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},

	{
		name: 'Profiles',
		component: AvailableInFullVersion,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Article',
		component: AvailableInFullVersion,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Chat',
		component: AvailableInFullVersion,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Messages',
		component: AvailableInFullVersion,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	,
	{
		name: 'Event List',
		component: EventListScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	},
	{
		name: 'Create Event',
		component: EventCreateScreen,
		headerLeft: headerLeftComponent,
		headerBackground: { source: headerBackground },
		headerBackTitle: "Back",
		headerTitleStyle: {
			fontFamily: fonts.primaryRegular,
			color: colors.white,
			fontSize: 18,
			alignSelf: 'center',
			marginRight: '15%'
		},
	}
]

export default StackNavigationData;
