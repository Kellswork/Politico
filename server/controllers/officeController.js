import createOffice from '../models/officeQuery';
import db from '../models/db';

class Office {
  static async createOffice(req, res) {
    try {
      const { type, name } = req.body;
      const values = [type, name];
      const { rows } = await db.query(createOffice, values);
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
export default Office;
