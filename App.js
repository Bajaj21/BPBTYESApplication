import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
// import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
// import { colors } from './src/styles';
import { store, persistor } from './src/redux/store';
import AuthContext from './src/context/AuthContext';
import * as TokenUtils from "./src/utils/TokenUtils";
import AppView from './src/modules/AppViewContainer';
import AppUtils from './src/utils/AppUtils';

export default class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isSignedIn: false,
			isLoading: false,
			isLoginWithMPIN: false
		};
	}

	componentDidMount = async () => {
		let data = await TokenUtils.getToken();
		if (AppUtils.isNotEmpty(data)) {
			this.setState({ isSignedIn: true, isLoginWithMPIN: false });
		}
	}

	updateContext = object => {
		this.setState(object);
	};

	render() {
		return (
			<Provider store={store} >
				<NavigationContainer>
					{/* <PersistGate
						loading={
							// eslint-disable-next-line react/jsx-wrap-multilines
							<View style={styles.container}>
								<ActivityIndicator color={colors.red} />
							</View>
						} 	persistor={persistor} 	> */}
					<AuthContext.Provider
						value={{ state: this.state, updateContext: this.updateContext }}>
						<AppView />
					</AuthContext.Provider>
					{/* </PersistGate> */}
				</NavigationContainer>
			</Provider >
		);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
});
