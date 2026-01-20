import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
    if(to){
        const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to : to,
        subject: "Reset Your Password",
        html: `<p>Your OTP for password reset  is <b>${otp}</b> it expires in 5 minutes</p>`,
        });
        console.log("Message sent:", info.messageId);
    }else{
        console.log("email is not given")
    }
};

export default sendMail