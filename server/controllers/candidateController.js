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
      const candidateExists = await db.query('select * from candidates where userId = $1 and partyId=$2', [userId, partyId]);
      if (candidateExists.rowCount >= 1) {
        return res.status(406).json({
          status: 406,
          error: 'canditate has already been registered',
        });
      }
      const result = await db.query('INSERT into candidates(officeId, partyId, userId) VALUES($1,$2,$3) RETURNING *', [officeId, partyId, userId]);
      console.log(result);
      console.log(result.rows);
      res.status(201).json({
        status: 201,
        data: {
          id: result.rows[0].id,
          office: result.rows[0].officeid,
          user: result.rows[0].userid,
        },
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
          error: 'candidate not found',
        });
      }
      const checkVote = await db.query('select * from votes where officeId =$1 and createdBy= $2', [office, voter]);
      if (checkVote.rowCount >= 1) {
        return res.status(406).json({
          status: 406,
          error: ' You cannot vote for the same office twice',
        });
      }

      const result = await db.query('INSERT into votes(createdBy, officeId, candidateId) VALUES($1,$2,$3) RETURNING *', [voter, office, candidate]);
      res.status(201).json({
        status: 201,
        data: {
          office: result.rows[0].officeid,
          candidate: result.rows[0].candidateid,
          voter: result.rows[0].createdby,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async electionResult(req, res) {
    try {
      const { officeId } = req.params;
      if (isNaN(officeId)) {
        return res.status(400).json({
          status: 400,
          error: 'id is not a number',
        });
      }
      const checkOffice = await db.query('select * from offices where id = $1', [officeId]);
      if (checkOffice.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const result = await db.query('SELECT officeId, candidateId, COUNT(candidateId) AS result FROM votes WHERE officeId=$1 GROUP BY candidateId, officeId', [officeId]);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'no result for this office yet',
        });
      }
      res.status(201).json({
        status: 200,
        data: result.rows,
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
