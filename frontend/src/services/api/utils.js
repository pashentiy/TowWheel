import { API_URL } from '../../config';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import Config from '../../config'

export const API = axios.create({ baseURL: API_URL });

export const MOCK = null


export const handleResponse = response => {
	if(response.status !== 200){
	console.log('API ERROR DEBUGGING ==> \n',response.data)
	}
	if(response && response.response && response.response.status === 401){
		return {
			status: false,
			code: response.response.status,
			data: null,
			error: 'Unauthorized access.'
		}
	}
	else if(response === null || response.status === undefined){
		return {
			status: false,
			code: '000',
			data: null,
			error: 'Something went wrong. Please report to Admin team.'
		}
	}
	else if(response.status === 202){
		return {
            status: false,
			data: null,
			code: response.status,
			error: response.data.error
		}
	}
	else if(response.status !== 200){
		return {
			status: false,
			code: response.status,
			data: null,
			error: response.data.error || 'Something went wrong. Please report to Admin team.'
		}
	}
	return {
		status: true,
		code: response.status,
		data: response.data,
		error: null
	}
}

export const getToken = async ()=>{
	const session = Config.session
	let response = session.access_token
	if((session.token_expiry-new Date().getTime())<1){
		//call refresh token and update client token
		await API.get('/auth/refresh-token/'+session.mobile+'/'+session.active_session_refresh_token)
        .then(async function (res) {
			session.access_token = res.data.access_token
			session.token_expiry = new Date().getTime() + 45 * 60000;
			Config.session = session
			response = res.data.access_token
        })
        .catch(error => {
			 console.log('error',error)
        })
	}
	
	return response
}

export const SOCKET = async (namespace='')=>{
	const token = await getToken()
	const socket = socketIOClient(API_URL+namespace,{
		query: {
			token: token
		},
		forceNew: true
	});
	return socket
}
  
export const isDataURL = async(s)=>{
	const res = await s.includes("file://") || s.includes("/private");
	return res;
}
