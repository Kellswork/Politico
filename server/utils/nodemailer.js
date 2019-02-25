import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'techlovergurl@gmail.com',
    pass: process.env.GMAIL,
  },
});

const passwordResetUrl = (token) => {
  const url = `http://localhost:8080/reset_password.html?token=${token}`;
  return url;
};
const mailOptions = (user, url) => {
  const mailInfo = {
    from: 'support@politico.com',
    to: 'ogbonnakell@gmail.com',
    subject: 'Password Reset Link',
    html: `<h3>Hi ${user.firstname}</h3>
    </p>You recently requested for a password change. Click on the link to reset your password:<p>
    <a href=${url}>${url}</a>.
    <p> Note that this link expires in an hour.</p>`,
  };
  return mailInfo;
};

const passwordChange = (user) => {
  const emailTemplate = {
    from: 'support@politico.com',
    to: 'ogbonnakell@gmail.com',
    subject: 'Password Changed',
    html: `<h3>Hi ${user.firstname}</h3>
    </p>Your password for signing in to Politico was recently changed.<p>
    </p>If you did not make this change, please reset your password to secure your account.<p>
    </p>regards,<p>
    </p>Politico Team<p>`,
  };
  return emailTemplate;
};


export {
  transporter,
  passwordResetUrl,
  mailOptions,
  passwordChange,
};
