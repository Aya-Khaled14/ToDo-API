const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: 'allen.jerde@ethereal.email',
    pass: 'MwbjBKNXJbAdz4bT4Y'
}
});

const sendMail = (subject, filename, filepath) => {
  console.log({ filename });
  console.log({ filepath });
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'Aya.2219113@stemsharkya.moe.edu.eg',
    subject: subject,
    text: "hello world",
    html: `<b style='color:red'>${subject}</b>`,
    attachments: [
      {
        filename: "klipartz.com",
        path: "./b/klipartz.com.png",
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    }
    console.log("Message sent: ", info.messageId);
  });
};

module.exports = { sendMail };
