import home from './home'
import auth from './auth'
import driver from './driver'
import { SOCKET } from './utils'

const api = {
    ...auth,
    ...home,
    ...driver,
    SOCKET
}
export default api