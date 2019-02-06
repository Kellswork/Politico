const createOffice = 'INSERT INTO offices(type, name) VALUES($1,$2) RETURNING *';

export default createOffice;
