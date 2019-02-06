const createParty = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING *';
const getParty = 'SELECT * FROM parties LIMIT 6';

export { getParty, createParty };
