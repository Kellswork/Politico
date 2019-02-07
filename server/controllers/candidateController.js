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
          error: 'you cannot regiter a user twice',
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

  static async vote(req, res) {
    try {
      const { office, candidate } = req.body;
      const voter = req.userData.id;
      const checkOffice = await db.query('select * from offices where id = $1', [office]);
      if (checkOffice.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const checkCandidate = await db.query('select * from candidates where id = $1', [candidate]);
      if (checkCandidate.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const checkVote = await db.query('select * fom votes where office=$1 and createdBy= $2', [office, voter]);
      if (checkVote.rowCount >= 1) {
        return res.status(406).json({
          status: 406,
          error: ' You cannot vote for the same office twice',
        });
      }

      const result = await db.query('INSERT into votes(createdBy, officeId, candidateId) VALUES($1,$2,$3) RETURNING *', [voter, office, candidate]);
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
