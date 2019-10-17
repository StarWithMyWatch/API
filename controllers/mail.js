const nodemailer = require('nodemailer');
class MailController {
    async sendMail(sender, destination, subject, message) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'starmywatch@gmail.com',
                pass: 'Smyw2019'
            }
        });

        var mailOptions;
        mailOptions = {
            from: sender,
            to: destination,
            subject: subject,
            text: message,
            html: '<b>' + message + '</b>'
        };

        try{
            await transporter.sendMail(mailOptions); 
            transporter.close();

            console.log('Message sent');
            return 200;
        }
        catch(err){
           console.log(err);
           return 500;
        }
    }
}

module.exports = new MailController();