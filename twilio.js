const twilio = require('twilio')
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN

const twl_client = twilio(accountSid, authToken)

module.exports = twl_client