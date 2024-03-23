const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');




async function sendEmails(recipients) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: '3stackcoder@gmail.com',
        pass: 'wzkmtlkivwncecio',
      },
    });

    const htmlFilePath = path.join(__dirname, 'Template2.html');
    const data = await fs.readFile(htmlFilePath, 'utf8');

    for (const recipient of recipients) {
      const mailOptions = {
        from: 'martinwarren2000@gmail.com',
        to: recipient,
        subject: 'With Love From PIXCL',
        html: data,
      };

      console.log(`Sending email to ${recipient}`);
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${recipient}`);
    }

    return true; // Indicate successful email sending
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
}

module.exports = sendEmails;

// const sendEmail = async (recipients) => {
//     console.log("Hello World");
//     try {
//         // Sending email using Nodemailer
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: '3stackcoder@gmail.com',
//                 pass: 'wzkmtlkivwncecio'
//             }
//         });

//         // Read the HTML file from the same directory
//         const htmlFilePath = path.join(__dirname, 'Template1.html');
//         const data = await fs.readFile(htmlFilePath, 'utf8');

//         // Loop through the recipients array and send email to each recipient
//         for (const recipient of recipients) {
//             const mailOptions = {
//                 from: '3stackcoder@gmail.com',
//                 to: recipient,
//                 subject: 'With Love From PIXCL',
//                 html: data
//             };

//             console.log(`Sending email to ${recipient}`);
//             // Send email to current recipient
//             await transporter.sendMail(mailOptions);
//             console.log(`Email sent successfully to ${recipient}`);
//         }
//     } catch (error) {
//         console.error("Email not sent:", error);
//         throw error;
//     }
// };

// module.exports = sendEmail;

// Array of recipient email addresses
// const recipients = ['martinwarren2000@gmail.com','leolalopeslobo@gmail.com' ]
// const recipients = 
// Call sendEmail function with the recipients array
// sendEmail(recipients)
//     .then(() => {
//         console.log('All emails sent successfully');
//     })
//     .catch((error) => {
//         console.error('Error sending emails:', error);
//     });