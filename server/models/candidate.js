const users = 'select * from users where id = $1';

const offices = 'select * from offices where id = $1';

const parties = 'select * from parties where id = $1';

const candidates = 'select * from candidates where id = $1';
const getNominees = `select candidates.id,users.passporturl as image, users.firstname, users.lastname, parties.name as party, offices.name as office, candidates.manifesto, candidates.status from candidates
left join users on users.id = candidates.userid
left join parties on parties.id = candidates.partyid
left join offices on offices.id = candidates.officeid
where status = 'pending'`;
const getCandidates = `select candidates.id,users.passporturl as image, users.firstname, users.lastname, parties.name as party, offices.name as office, candidates.manifesto, candidates.status from candidates
left join users on users.id = candidates.userid
left join parties on parties.id = candidates.partyid
left join offices on offices.id = candidates.officeid where status = 'accepted'`;
const newCandidate = 'INSERT into candidates(officeId, partyId, userId, manifesto) VALUES($1,$2,$3,$4) RETURNING *';
const updateStatus = 'UPDATE candidates SET status = $1, modifiedAt = NOW() WHERE id = $2';

export {
  users,
  offices,
  parties,
  candidates,
  newCandidate,
  updateStatus,
  getCandidates,
  getNominees,
};
