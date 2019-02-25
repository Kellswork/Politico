const userSignup = `INSERT INTO users(firstName, lastName, otherName, email, password, phoneNumber, passportUrl)
VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id, firstName, lastName, otherName, email, phoneNumber, passportUrl, isAdmin, createdAt`;

const userDetails = 'SELECT * FROM users WHERE email = $1';

const userId = 'SELECT * FROM users WHERE id = $1';

const fullName = 'SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1';

const updateUsers = ('UPDATE users SET password = $1 WHERE id = $2');


export {
  userSignup,
  userDetails,
  fullName,
  userId,
  updateUsers,
};
