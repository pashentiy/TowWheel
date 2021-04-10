import moment from 'moment';
moment.locale('en');
import Config from 'src/config'

export const ChatTimeFormat = date => {
    const diff = moment(new Date()).diff(new Date(date), 'days')
    if (diff == 1)
        return 'Yesterday'
    else if (diff == 0)
        return moment(new Date(date)).format('h:mm A')
    else if (diff > 1 && diff < 30)
        return moment(new Date(date)).format('MMM Do')
    else
        return moment(new Date(date)).format('DD-MM-YY')
}

export const AgeFormat = date => {
    const diff = moment().diff(new Date(date), 'years')
    return diff
}

export const IsOnlineSession = (online_status, last_seen) => {
    if (online_status == false)
        return false
    const session_timeout = Config.online_session_timeout
    const diff = moment().diff(new Date(last_seen), 'minutes')
    if (diff > session_timeout)
        return false
    return true
}

export const LikesCountFormat = (likes) => {
    if (likes >= 1000000000)
        return Math.round(likes / 1000000000)+'B'
    if (likes >= 1000000)
        return Math.round(likes / 1000000)+'M'
    if (likes >= 1000)
        return Math.round(likes / 1000)+'K'
    return likes
}
