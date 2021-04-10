import { handleResponse, API, MOCK, getToken } from './utils';

const home = {
    getRecentlyActiveUsers: async () => {
        let response = null
        const token = await getToken()
        try {
            response = await API.get(`/home/get-recent-active-users`,
                { 'headers': { 'Authorization': 'Bearer: ' + token } }
            )
        }
        catch (e) {
            response = e
        }
        return handleResponse(response);
    },
    getIntroductions: async (page=1) => {
        let response = null
        const token = await getToken()
        try {
            response = await API.get(`/home/get-newsfeeds/?page=${page}`,
                { 'headers': { 'Authorization': 'Bearer: ' + token } }
            )
        }
        catch (e) {
            response = e
        }
        
        return handleResponse(response);
    },
    sendLike: async (id, isLiked) => {
        let response = null
        const token = await getToken()
        try {
            response = await API.post('/home/send-like', {
                profile_picture_id: id,
                isLiked: isLiked
            },
                { 'headers': { 'Authorization': 'Bearer: ' + token } }
            )
        }
        catch (e) {
            response = e
        }
        return handleResponse(response);
    },
}

export default home