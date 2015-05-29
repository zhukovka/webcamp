var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'darvina10@gmail.com',
        pass: 'mertvopysch1013'
    }
});

module.exports = transporter;