const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
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
    // /Users/abdullahrady/Documents/VScode Projects/Bug-Squash-Gang/Server/utils/emails/template/welcome.handlebars
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
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
          path: __dirname,
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


/*
Example:
sendEmail(
  "youremail@gmail.com,
  "Email subject",
  { name: "Eze" },
  "./templates/layouts/main.handlebars"
);
*/

module.exports = sendEmail;