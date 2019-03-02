const users = 'select * from users where id = $1';

const offices = 'select * from offices where id = $1';

const parties = 'select * from parties where id = $1';

const candidates = 'select * from candidates where id = $1 AND officeId = $2';
const newCndidate = 'INSERT into candidates(officeId, partyId, userId) VALUES($1,$2,$3) RETURNING *';
export {
  users, offices, parties, candidates, newCndidate,
};
