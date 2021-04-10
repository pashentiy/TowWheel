import { handleResponse, API, MOCK } from './utils';

const auth = {
    sendOtp : async (mobile) => {
        let response = null
        try{
            response = await API.post('/auth/login',{
                mobile: mobile
            })
        }
        catch(e){
            response = e
        }
        return handleResponse(response);
    },
    verifyOtp : async (mobile,otp) => {
        let response = null
        try{
            response = await API.post('/auth/login',{
                mobile: mobile,
                otp: otp
            })
        }
        catch(e){
            response = e
        }
        return handleResponse(response);
    },
    signUp : async (userData) => {
        let response = null
		const data = new FormData();
		try{
        
            await API.post('/auth/signup',userData)
            .then(function (res) {
                response = res
            })
            .catch(function (error) {
                response = error
            })
		}
		catch(e){
			response = e
		}
        return handleResponse(response);
    },
    loginByToken : async (mobile,refresh_token)=>{
        let response = null
        await API.get('/auth/login-by-token/'+mobile+'/'+refresh_token)
        .then(function (res) {
            response = res
        })
        .catch(function (error) {
            // console.log(error.response)
            response = error
        })
        return handleResponse(response);
	}
}

export default auth