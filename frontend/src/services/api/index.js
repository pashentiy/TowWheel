import home from './home'
import auth from './auth'
import { SOCKET } from './utils'

const api = {
    ...auth,
    ...home,
    SOCKET
}
export default api