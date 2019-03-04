const users = 'select * from users where id = $1';

const offices = 'select * from offices where id = $1';

const parties = 'select * from parties where id = $1';

const candidates = 'select * from candidates where id = $1';
const newCandidate = 'INSERT into candidates(officeId, partyId, userId) VALUES($1,$2,$3) RETURNING *';
const addNominee = 'INSERT into nominee(officeId, partyId, userId, manifesto) VALUES($1,$2,$3,$4) RETURNING *';
const nominee = 'select * from nominee where userid = $1';

export {
  users,
  offices,
  parties,
  candidates,
  newCandidate,
  addNominee,
  nominee,
};
