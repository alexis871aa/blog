import axios from 'axios';

export async function request(url, method, data) {
	return await axios({
		url,
		method: method || 'GET',
		data: data || null,
	}).then((response) => {
		return response.data;
	});
}
