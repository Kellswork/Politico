import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middleware/generateToken';
import {
  userSignup,
  userDetails,
  fullName,
  userId,
} from '../models/userQuery';
import {
  dataUri,
} from '../middleware/multer';
import {
  v2,
} from '../config/cloudinaryConfig';

dotenv.config();
class User {
  static async userSignup(req, res) {
    try {
      const {
        firstName,
        lastName,
        otherName,
        email,
        phoneNumber,
      } = req.body;
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      let passportUrl = 'https://res.cloudinary.com/dghlhphlh/image/upload/v1550583941/passportUrl/pictureAvatar.png';
      if (req.file) {
        const file = dataUri(req).content;
        const fileUpload = await v2.uploader.upload(file, {
          folder: 'passportUrl/',
        });
        if (fileUpload) {
          passportUrl = fileUpload.url;
        }
      }
      const values = [firstName, lastName, otherName, email, password, phoneNumber, passportUrl];
      const result = await db.query(userSignup, values);
      const name = await db.query(fullName, [email]);
      const token = generateToken(result, name, email);
      return res.header('x-auth-token', token).status(201).json({
        status: 201,
        data: {
          token,
          user: {
            id: result.rows[0].id,
            firstName: result.rows[0].firstname,
            lastName: result.rows[0].lastname,
            otherName: result.rows[0].othername,
            email,
            phoneNumber: result.rows[0].phonenumber,
            passportUrl: result.rows[0].passporturl,
            isAdmin: result.rows[0].isadmin,
            createdAt: result.rows[0].createdat,
          },
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

  static async userLogin(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;
      const userEmail = await db.query(userDetails, [email]);
      if (!userEmail.rows.length) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
      const userPassword = await bcrypt.compare(password, userEmail.rows[0].password);
      if ((!userEmail.rows[0]) || (userPassword === false)) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }

      const rows = userEmail;
      const name = await db.query(fullName, [email]);
      const token = generateToken(rows, name, email);
      const {
        firstname,
        lastname,
        othername,
        phonenumber,
        passporturl,
        isadmin,
        createdat,
        id,
      } = rows.rows[0];
      return res.header('x-auth-token', token).status(200).json({
        status: 200,
        data: {
          token,
          user: {
            id,
            firstName: firstname,
            lastName: lastname,
            otherName: othername,
            email,
            phoneNumber: phonenumber,
            passportUrl: passporturl,
            isAdmin: isadmin,
            createdAt: createdat,
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

  static async getOneUser(req, res) {
    try {
      const {
        id,
      } = req.params;
      const {
        rows,
      } = await db.query(userId, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }
      if (rows[0].id !== req.userData.id && req.userData.admin === false) {
        return res.status(409).json({
          status: 409,
          error: 'You cannot view this data',
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows[0],
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
