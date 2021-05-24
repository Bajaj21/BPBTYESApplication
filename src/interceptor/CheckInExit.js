import { getToken } from "../utils/TokenUtils"


const config = {
	'content-type': 'application/json',
    'Authorization': getToken
}


export default {
checkInExist: (data,url) =>
axios.request({
method: 'get',
baseURL: url,
headers: config,
data: data

}).then(res => res),
}
