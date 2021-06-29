const { createMollieClient } = require('@mollie/api-client');
const mollieClient = createMollieClient({ apiKey: 'test_D9mWrjMUbU9VJ8CwvME8wj2WJDbkCK' });


const {
    IsExists, IsExistsOne, Insert, Find, FindOne, CompressImageAndUpload, FindAndUpdate, Delete,
    HandleSuccess, HandleError, HandleServerError,
    ValidateEmail, PasswordStrength, ValidateAlphanumeric, ValidateLength, ValidateMobile, isDataURL, GeneratePassword, Aggregate
} = require('./BaseController');


module.exports = {
    mollieCheckoutSuccess: async (req, res) => {
        try{

        }
        catch(err){
            HandleServerError(res, req, err)
        }
    },

    beginTransaction: async (req, res) => {
        try {
            const price = req.body.price
            const payment = await mollieClient.payments.create({
                amount: {
                    value: price.toString(),
                    currency: 'USD'
                },
                description: `You're going to pay ${price} USD`,
                redirectUrl: 'https://purchase/success',
                webhookUrl: ``
            })
            return HandleSuccess(res, payment.getCheckoutUrl())
        } catch (err) {
            console.log('Mollie Checkout Error', err)
            HandleServerError(res, req, err)
        }

    }
}
