import db from '../models/db';
import {
  offices, parties, candidates, newCandidate, updateStatus, getCandidates, getNominees,
} from '../models/candidate';

class Candidate {
  static async addNominee(req, res) {
    const { officeId, partyId, manifesto } = req.body;
    const userId = req.userData.id;
    const checkOffice = await db.query(offices, [officeId]);
    if (checkOffice.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'office not found',
      });
    }
    const checkParty = await db.query(parties, [partyId]);
    if (checkParty.rowCount < 1) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }
    const userExists = await db.query(candidates, [userId]);
    if (userExists.rowCount >= 1) {
      return res.status(409).json({
        status: 409,
        error: 'You have already applied for a political office',
      });
    }
    const { rows } = await db.query(newCandidate, [officeId, partyId, userId, manifesto]);
    res.status(201).json({
      status: 201,
      data: {
        office: rows[0].officeid,
        party: rows[0].partyid,
        user: rows[0].userid,
        manifesto: rows[0].manifesto,
      },
    });
  }

  static async registerCandidate(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      let { rows } = await db.query(candidates, [id]);

      if (rows[0].status !== 'pending') {
        return res.status(409).json({
          status: 409,
          error: 'status has already been updated',
        });
      }
      rows = await db.query(updateStatus, [status, id]);
      return res.status(200).json({
        status: 200,
        message: 'status has been updated',
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
      const checkOffice = await db.query(offices, [office]);
      if (checkOffice.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'office not found',
        });
      }
      const checkCandidate = await db.query(candidates, [candidate, office]);
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
          error: 'You cannot vote for the same office twice',
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
          error: 'office id is not a number',
        });
      }
      const checkOffice = await db.query(offices, [officeId]);
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

  static async getAllNominees(req, res) {
    try {
      const result = await db.query(getNominees);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 404,
          error: 'no user has registered as for a political office',
        });
      }
      return res.status(200).json({
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

  static async getAllCandidates(req, res) {
    try {
      const result = await db.query(getCandidates);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'No data found',
        });
      }
      return res.status(200).json({
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
