const createParty = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING *';
const getParty = 'SELECT * FROM parties LIMIT 6';
const party = 'SELECT * FROM party WHERE id = $1';

export { getParty, createParty, party };
