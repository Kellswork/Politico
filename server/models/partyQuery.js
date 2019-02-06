const createParty = 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING *';

export default createParty;
