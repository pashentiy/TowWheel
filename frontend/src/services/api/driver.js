import { handleResponse, API, MOCK, getToken } from './utils';

const driver = {
    getNearestRideRequest: async (latitude, longitude) => {
        let response = null
        const token = await getToken()
        try {
            response = await API.get(`/driver/get-nearest-ride-request`,
                {
                    params: {
                        latitude: latitude,
                        longitude: longitude
                    },
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

export default driver