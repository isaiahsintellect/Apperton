const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Twilio SMS Setup
const accountSid = 'your_twilio_account_sid'; // Your Twilio account SID
const authToken = 'your_twilio_auth_token'; // Your Twilio auth token
const client = twilio(accountSid, authToken);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or any other email service
    auth: {
        user: 'your_email@gmail.com', // Your email address
        pass: 'your_email_password' // Your email password
    }
});

// Function to send SMS
const sendSms = (to, propertyDetails) => {
    return client.messages.create({
        body: `Property Details: ${propertyDetails}`,
        to: to,  // Text this number
        from: 'your_twilio_phone_number' // From a valid Twilio number
    });
};

// Function to send email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendSms, sendEmail };