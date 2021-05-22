import axios from 'axios';
const config = {
	'content-type': 'application/json'
}

export default {
	login: (data, url) =>
		axios.request({
			method: 'post',
			baseURL: url + "/Api/access_token", //"https://demo.bpbytes.com.au/Api/access_token"
			headers: config,
			data: data
		}).then(res => res),
}
