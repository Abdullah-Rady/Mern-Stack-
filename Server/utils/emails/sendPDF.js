const nodemailer = require("nodemailer");


const sendPDF = async (email, subject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
        },
      });
     
      const options = () => {
        return {
          from: process.env.FROM_EMAIL,
          to: email,
          subject: subject,
          text: 'Here is your course Certificate',
          attachments: [{
            filename: 'file.pdf',
            path: __dirname + '/file.pdf',
            contentType: 'application/pdf'
          }],
        };
      };
  
      
      // Send email
      transporter.sendMail(options(), (error, info) => {
        if (error) {
          console.log(error);
          throw new Error(error);
        } else {
          return res.status(200).json({
            success: true,
          });
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  
  };
  
module.exports = sendPDF;
