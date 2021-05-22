import axios from 'axios';
import { useContext } from 'react';
import { Alert } from 'react-native';
import AuthContext from '../context/AuthContext';
import * as TokenUtils from '../utils/TokenUtils';

const axiosInstance = axios.create({ baseURL: '' }); //TokenUtils.getURL()

axiosInstance.interceptors.request.use(async (config) => {
	const token = await TokenUtils.getToken();
	if (token) {
		const headers = {
			'content-type': 'application/json',
			'authorization': 'Bearer ' + token
		}
		config.headers = headers;
	}
	//console.log(JSON.stringify(config));
	return config;
}, (error) => {
	return Promise.reject(error);
});

//const authContext = useContext(AuthContext);

axiosInstance.interceptors.response.use((response) => {
	return response;
}, async (error) => {
	if (error.message === 'Network Error') {
		Alert.alert('Oops!', 'Server not response.');
	}
	else if (error.response && error.response.status === 404) {
		Alert.alert('Oops!', 'Invalid url.');
	}
	else if (error.response && error.response.status === 401) {
		//Alert.alert('Oops!', 'Your session has been expired.');
		await TokenUtils.deleteToken();
		await TokenUtils.deleteMpin();
		//console.log("test", authContext);
		//authContext.updateContext({ isSignedIn: false, isLoading: false, isLoginWithMPIN: false });
		console.log("======================401==================");
	}
	return Promise.reject(error);
});

export default axiosInstance;
