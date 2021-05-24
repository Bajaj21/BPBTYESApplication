import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
	createDrawerNavigator,
	DrawerItem,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import AuthContext from '../../context/AuthContext';
import UserContext from '../../context/UserContext';


const iconHome = require('../../../assets/images/drawer/home.png');
const iconProfile = require('../../../assets/images/drawer/icon/profile.png');
const iconPassword = require('../../../assets/images/drawer/icon/password.png');
const iconLogout = require('../../../assets/images/drawer/icon/logout.png');
const iconSettings = require('../../../assets/images/drawer/icon/settings.png');
const qr = require('../../../assets/images/drawer/icon/qr.png');
import LinearGradient from 'react-native-linear-gradient';
import { useContext } from 'react';
import * as TokenUtils from "../../utils/TokenUtils";

import AppConstant from "../../constants/AppConstant";
import axiosInstance from '../../interceptor/http-interceptor';
import { fonts } from '../../styles';




const drawerData = [
	{
		name: 'Home',
		icon: iconHome,
	},
	{
		name: 'Profile',
		icon: iconProfile,
	},
	{
		name: 'Site Check-In',
		icon: qr,
	},

	{
		name: 'Access Web Version',
		icon: iconPassword,
	},

	{
		name: 'Settings',
		icon: iconSettings,
	}

];

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const authContext = useContext(AuthContext);
	const [user, setUser] = React.useState({});

	React.useEffect(() => {
		console.log("react hook use effect call");
		getProfile(1);
	}, []);

	getProfile = async (param) => {
		console.log("get profile call");
		let url = await TokenUtils.getURL();
		let response = await axiosInstance.get(url + AppConstant.USER_API + param);
		let data = response.data;
		if (data.data && data.data.attributes) {
			//console.log("axiso", data.data.attributes);
			setUser(data.data.attributes);
		}

		// .then((response) => {
		// 	if (response.data) {
		// 		//console.log(response.data);
		// 		if (mounted)
		// 			setUser(response.data);
		// 	}
		// }
		// ).catch(error => {
		// 	if (error.response && error.response.data) {
		// 		Alert.alert('Oops!', error.response.data.message);
		// 	}
		// });
	}

	return (
		<DrawerContentScrollView {...props} style={{ padding: 0 }}>
			<LinearGradient
				style={{ marginTop: -4, flex: 1 }}
				start={{ x: 1, y: 0 }}
				end={{ x: 0.7, y: 1 }}
				colors={['#09CFF7', '#5F58B9']}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={require('../../../assets/images/drawer/icon/user.png')}
					/>
					<View style={{ paddingLeft: 15 }}>
						<Text style={styles.userName}>{user.full_name}</Text>
						<Text style={styles.email}>{user.email1}</Text>
					</View>
				</View>
				<View style={styles.divider} />
				{drawerData.map((item, idx) => (
					<DrawerItem
						key={`drawer_item-${idx + 1}`}
						label={() => (
							<View
								style={styles.menuLabelFlex}>
								<Image
									style={{ width: 20, height: 20 }}
									source={item.icon}
								/>
								<Text style={styles.menuTitle}>{item.name}</Text>
							</View>
						)}
						onPress={() => props.navigation.navigate(item.name)}
					/>
				))}
				<View style={styles.divider} />
				<DrawerItem
					label={() => (
						<View style={styles.menuLabelFlex}>
							<Image
								style={{ width: 20, height: 20 }}
								source={iconLogout}
							/>
							<Text style={styles.menuTitle}>Logout</Text>
						</View>
					)}
					onPress={() => {
						TokenUtils.deleteToken();
						TokenUtils.deleteMpin();
						authContext.updateContext({ isSignedIn: false, isLoading: false, isLoginWithMPIN: false });
					}}
				/>
			</LinearGradient>
		</DrawerContentScrollView>
	);
}

export default function App() {
	return (
		<Drawer.Navigator
			drawerStyle={{
				backgroundColor: '#5F58B9',
			}}
			drawerContentOptions={{ activeBackgroundColor: '#5cbbff', activeTintColor: '#ffffff' }}
			drawerContent={props => <CustomDrawerContent {...props} />}
		>
			<Drawer.Screen name="Homes" component={NavigatorView} />
		</Drawer.Navigator >
	);
}

const styles = StyleSheet.create({
	menuTitle: {
		marginLeft: 10,
		color: '#fff',
		fontFamily: fonts.primaryBold
	},
	menuLabelFlex: {
		display: 'flex',
		flexDirection: 'row'
	},
	userName: {
		color: '#fff',
		fontSize: 18,
		fontFamily: fonts.primaryBold
	},
	email: {
		color: '#fff',
		fontFamily: fonts.primaryBold
	},
	divider: {
		borderBottomColor: 'white',
		opacity: 0.2,
		borderBottomWidth: 1,
		margin: 15,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	avatarContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 20,
		marginBottom: 10
	},
});
