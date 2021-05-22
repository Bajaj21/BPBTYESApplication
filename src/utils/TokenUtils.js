import AsyncStorage from '@react-native-async-storage/async-storage';

export async function deleteToken() {
	console.log("delete token");
	const obj = await AsyncStorage.removeItem('token');
	return {};
}

export async function saveToken(data) {
	await AsyncStorage.setItem('token', JSON.stringify(data));
	return '';
}

export async function getToken() {
	const obj = await AsyncStorage.getItem('token');
	if (obj) {
		let token = JSON.parse(obj);
		return token.access_token;
	}
	return null;
}

export async function saveMpin(data) {
	await AsyncStorage.setItem('pin', data);
	return '';
}

export async function getMpin() {
	const pin = await AsyncStorage.getItem('pin');
	if (pin) {
		return pin;
	}
	return null;
}

export async function deleteMpin() {
	const obj = await AsyncStorage.removeItem('pin');
	return {};
}


export async function setURL(data) {
	await AsyncStorage.setItem('url', data);
	return '';
}

export async function getURL() {
	const url = await AsyncStorage.getItem('url');
	if (url) {
		return url;
	}
	return url;
}