import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Navigator from './navigation/Navigator';
import LoginScreen from './login/LoginView';
import MPinScreen from './Mpin/MpinView';
import AuthContext from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AppView() {
	return (
		<AuthContext.Consumer>
			{
				context => {
					return !context.state.isSignedIn ? <Stack.Navigator>
						<Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
						<Stack.Screen name="MPIN" component={MPinScreen} options={{ headerShown: false }} />
					</Stack.Navigator> : context.state.isLoginWithMPIN ?
						<Navigator onNavigationStateChange={() => { }} uriPrefix="/app" /> :
						<Stack.Navigator><Stack.Screen name="MPIN" component={MPinScreen} options={{ headerShown: false }} /></Stack.Navigator>
				}
			}
		</AuthContext.Consumer>
	)
}
