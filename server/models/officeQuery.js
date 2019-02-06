const createOffice = 'INSERT INTO offices(type, name) VALUES($1,$2) RETURNING *';
const getOffice = 'SELECT * FROM offices LIMIT 6';

export { createOffice, getOffice };
