import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middleware/generateToken';
import { userSignup, userDetails, fullName } from '../models/query';
import { multerUploads, dataUri } from '../middleware/multer';
import { uploader, cloudinaryConfig } from '../config/cloudinaryConfig';

dotenv.config();
class User {
  static async userSignup(req, res) {
    try {
      const {
        firstName, lastName, otherName, email, phoneNumber,
      } = req.body;
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
      console.log(err.message);
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default User;
