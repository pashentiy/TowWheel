import { handleResponse, API, MOCK, getToken } from './utils';

const payment = {
    getPayment: async (price) => {
        let response = null
        const token = await getToken()
        try {
            response = await API.post(`/payment/beginTransaction`,
            {
                price: price
            },
            {
                'headers': { 'Authorization': 'Bearer: ' + token }
            }
            )
        }
        catch (e) {
            response = e
            console.log("failed response of payment ", response)

        }
        console.log("response of payment ", response)
        return handleResponse(response);
    }
}

export default payment