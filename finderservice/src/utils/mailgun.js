
import formData from 'form-data';
import Mailgun from 'mailgun.js';


export async function mailGun(to,subject,content) {

    const DOMAIN = 'cupatickets.com';
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere'});

    const messageData = {
    from: "Finder Service <no-reply@cupatickets.com>",
    to: [to],
    subject: subject,
    text: '',
    html: content
    };

    mg.messages.create('cupatickets.com', messageData)
  .then(msg => console.log(msg)) // logs response data
  .catch(err => console.log(err)); // logs any error
}