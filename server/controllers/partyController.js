import { dataUri } from '../middleware/multer';
import { uploader } from '../config/cloudinaryConfig';
import db from '../models/db';
import createParty from '../models/partyQuery';

class Party {
  static async createParty(req, res) {
    try {
      const { name, hqAddress } = req.body;
      console.log(JSON.stringify(req.body));
      let logoUrl;
      if (req.file) {
        const file = dataUri(req).content;
        const fileUpload = await uploader.upload(file);
        if (fileUpload) {
          logoUrl = fileUpload.url;
        }
      }

      const values = [name, hqAddress, logoUrl];
      const { rows } = await db.query(createParty, values);
      res.status(201).json({
        status: 201,
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
export default Party;
