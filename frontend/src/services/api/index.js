import home from './home'
import auth from './auth'
import driver from './driver'
import payment from './payment'
import { SOCKET } from './utils'

const api = {
    ...auth,
    ...home,
    ...driver,
    ...payment,
    SOCKET
}
export default api