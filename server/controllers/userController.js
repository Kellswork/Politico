import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middleware/generateToken';
import { userSignup, userDetails, fullName } from '../models/userQuery';
import { dataUri } from '../middleware/multer';
import { uploader } from '../config/cloudinaryConfig';

dotenv.config();
class User {
  static async userSignup(req, res) {
    try {
      const {
        firstName, lastName, otherName, email, phoneNumber,
      } = req.body;
      console.log(req.body);
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      let passportUrl;
      if (req.file) {
        const file = dataUri(req).content;
        const fileUpload = await uploader.upload(file);
        if (fileUpload) {
          passportUrl = fileUpload.url;
        }
      }

      const values = [firstName, lastName, otherName, email, password, phoneNumber, passportUrl];
      const {
        rows,
      } = await db.query(userSignup, values);
      const user = await db.query(userDetails, [email]);
      const name = await db.query(fullName, [email]);
      const token = generateToken(user, name, email);
      return res.header('x-auth-token', token).status(200).json({
        status: 201,
        data: {
          token,
          user: rows[0],
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const userEmail = await db.query(userDetails, [email]);
      const userPassword = await bcrypt.compare(password, userEmail.rows[0].password);
      if ((!userEmail.rows[0]) || (userPassword === false)) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
      const rows = await db.query(userDetails, [email]);
      const name = await db.query(fullName, [email]);
      const token = generateToken(rows, name, email);
      const {
        firstname, lastname, othername, phonenumber, passporturl, isadmin, registeredon,
      } = rows.rows[0];
      return res.header('x-auth-token', token).status(200).json({
        status: 200,
        data: {
          token,
          user: {
            firstname, lastname, othername, phonenumber, passporturl, isadmin, registeredon,
          },

        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default User;
