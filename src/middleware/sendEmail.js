import nodemailer from "nodemailer";
import "dotenv/config";

function sendEmail(message, toEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_EMAIL_P,
    },
  });
  let mailOptions = {
    from: process.env.USER_EMAIL, // sender address
    to: "arthurjunior88741@gmail.com", // list of receivers
    subject: "Email from your portfolio", // Subject line
    html: message, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    res.render("contact", { msg: "Email has been sent" });
  });
}

export default sendEmail;