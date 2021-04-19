import { handleResponse, API, MOCK, getToken } from './utils';

const home = {
    getNearestTows: async (latitude, longitude) => {
        let response = null
        try {
            response = await API.get(`/home/get-nearest-tows`,
                {
                    params: {
                        latitude: latitude,
                        longitude: longitude
                    },
                    //'headers': { 'Authorization': 'Bearer: ' + token }
                }
            )
        }
        catch (e) {
            response = e
        }
        return handleResponse(response);
    },
    getMyRideRequest: async () => {
        let response = null
        const token = await getToken()
        try {
            response = await API.get(`/home/get-my-ride-request`,
                {
                    'headers': { 'Authorization': 'Bearer: ' + token }
                }
            )
        }
        catch (e) {
            response = e
        }
        return handleResponse(response);
    },
    createRideRequest: async (data) => {
        let response = null
        const token = await getToken()
        try {
            response = await API.post(`/home/create-ride-request`,
                data,
                {
                    'headers': { 'Authorization': 'Bearer: ' + token }
                }
            )
        }
        catch (e) {
            response = e
        }
        return handleResponse(response);
    }
}

export default home