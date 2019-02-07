import db from '../models/db';

class Candidate {
  static async registerCandidate(req, res) {
    try {
      const { userId } = req.params;
      const { officeId, partyId } = req.body;

      const checkUser = await db.query('select * from users where id = $1', [userId]);
      if (checkUser.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'user not found',
        });
      }
      const checkOffice = await db.query('select * from offices where id = $1', [officeId]);
      if (checkOffice.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const checkParty = await db.query('select * from parties where id = $1', [partyId]);
      if (checkParty.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'party not found',
        });
      }
      const candidateExists = await db.query('select * from candidates where userId = $1', [userId]);
      if (candidateExists.rowCount >= 1) {
        return res.status(406).json({
          status: 406,
          error: 'user has already been registered for an office',
        });
      }
      const result = await db.query('INSERT into candidates(officeId, partyId, userId) VALUES($1,$2,$3) RETURNING *', [officeId, partyId, userId]);
      console.log(result);
      res.status(201).json({
        status: 201,
        data: result.rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}


export default Candidate;
