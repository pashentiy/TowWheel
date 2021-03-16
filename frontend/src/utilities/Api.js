import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://towheelnodejs-env.eba-w96vzgyp.us-east-2.elasticbeanstalk.com',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
  });


export const sendOtp = async (phoneNumber) => {
    console.log(phoneNumber)
    instance.post('/sendOTP', {
        phoneNumber: phoneNumber
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
}