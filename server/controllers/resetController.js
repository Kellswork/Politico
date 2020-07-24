import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/db';

import {
  transporter,
  mailOptions,
  passwordResetUrl,
  passwordChange,
} from '../utils/nodemailer';
import {
  userDetails,
  userId,
  updateUsers,
} from '../models/userQuery';

const passowordToken = ({
  password,
  id,
  createdat,
}) => {
  const secret = `${password}_${createdat}`;
  const token = jwt.sign({
    id,
  }, secret, {
    expiresIn: '1h',
  });
  return token;
};

class ResetPassword {
  static async passwordResetEmail(req, res) {
    const {
      email,
    } = req.body;
    const userEmail = await db.query(userDetails, [email]);
    if (userEmail.rowCount <= 0) {
      return res.status(400).json({
        status: 400,
        error: 'invalid email',
      });
    }
    const token = passowordToken(userEmail.rows[0]);
    const url = passwordResetUrl(token);
    const emailTemplate = mailOptions(userEmail.rows[0], url);
    const sendEmail = () => {
      transporter.sendMail(emailTemplate, (error) => {
        if (error) {
          res.status(500).json({
            status: 500,
            error,
          });
        }
        res.status(200).json({
          status: 200,
          data: [{
            message: 'check your email for password reset link',
            email: userEmail.rows[0].email,
          }],
        });
      });
    };
    sendEmail();
  }

  static async isTokenValid(req, res) {
    try {
      const {
        token,
      } = req.body;
      const payload = jwt.decode(token);
      const {
        rows,
      } = await db.query(userId, [payload.id]);
      const secret = `${rows[0].password}_${rows[0].createdat}`;
      const user = jwt.verify(token, secret);
      if (user.id !== rows[0].id) {
        return res.status(401).json({
          status: 401,
          error: 'Password token link is invalid or has expired',
        });
      }
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'Password token link is invalid or has expired',
      });
    }
  }

  static async updateUserPassword(req, res) {
    try {
      const {
        token,
      } = req.body;
      const payload = jwt.decode(token);
      const {
        rows,
      } = await db.query(userId, [payload.id]);
      const secret = `${rows[0].password}_${rows[0].createdat}`;
      const user = jwt.verify(token, secret);
      if (req.body.password !== req.body.passwordAgain) {
        return res.status(400).json({
          status: 400,
          error: 'Password does not match',
        });
      }
      const password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
      await db.query(updateUsers, [password, user.id]);
      const sendEmail = async () => {
        await transporter.sendMail(passwordChange(rows[0]));
      };
      sendEmail();
      return res.status(202).json({
        status: 202,
        message: 'Your password has been updated successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}


export default ResetPassword;
