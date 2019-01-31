import { expect } from 'chai';
import supertest from 'supertest';
import server from '../app';

const api = supertest(server);

describe('Offices', () => {
  describe('POST /office', () => {
    it('should create a political office', (done) => {
      const newOffice = {
        type: 'local government',
        name: 'deputy chairman',
      };
      api.post('/api/v1/offices')
        .set('Content-Type', 'application/json')
        .send(newOffice)
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('type');
          expect(res.body.data).to.have.property('name');

          done();
        });
    });
    it('should return a 400', (done) => {
      const newOffice = {
        name: 'deputy chairman',
      };
      api.post('/api/v1/offices')
        .set('Content-Type', 'application/json')
        .send(newOffice)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });
  describe('GET /offices', () => {
    it('should return all political offices', (done) => {
      api.get('/api/v1/offices')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('array');
          expect(res.body.status).to.equal(200);
          done();
        });
    });
  });
  describe('GET /offices/:id', () => {
    it('should fetch the political office with the given id', (done) => {
      api.get('/api/v1/offices/1')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('type');
          expect(res.body.data).to.have.property('name');
          done();
        });
    });
    it('should return 400 if the id is not a number', (done) => {
      api.get('/api/v1/offices/y2k')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('id is not a number');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('should return a 404 if the political office was not found', (done) => {
      api.get('/api/v1/offices/16')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('This political office does not exist');
          done();
        });
    });
  });
});

describe('Parties', () => {
  describe(' POST /parties', () => {
    it('should return the name of the newly created party', (done) => {
      const party = {
        name: 'action democratic party',
      };
      api.post('/api/v1/parties')
        .set('Content-Type', 'application/json')
        .send(party)
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          done();
        });
    });
    it('should return a 400 if no name was sent', (done) => {
      const party = {
        name: '',
      };
      api.post('/api/v1/parties')
        .set('Content-Type', 'application/json')
        .send(party)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
  });
  describe('GET /parties', () => {
    it('should return all political parties', (done) => {
      api.get('/api/v1/parties')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.be.a('array');
          done();
        });
    });
  });
  describe('GET /parties/:id', () => {
    it('should return the political party with the given id', (done) => {
      api.get('/api/v1/parties/2')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('logoUrl');
          done();
        });
    });
    it('should return 400 if the id is not a number', (done) => {
      api.get('/api/v1/parties/2k')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('id is not a number');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('should return a 404 if the political party was not found', (done) => {
      api.get('/api/v1/parties/16')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('Could not find political party');
          done();
        });
    });
  });
  describe('PATCH /parties/:id/name', () => {
    it('should return the edited name of a specific political party', (done) => {
      const party = {
        name: 'cafe royal',
      };
      api.patch('/api/v1/parties/3/name')
        .set('Content-Type', 'application/json')
        .send(party)
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.status).to.equal(200);
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          done();
        });
    });
    it('should return a 400 if user did not input party name', (done) => {
      const party = {
        name: '',
      };
      api.patch('/api/v1/parties/3/name')
        .set('Content-Type', 'application/json')
        .send(party)
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          done();
        });
    });
    it('should return 400 if the id is not a number', (done) => {
      api.get('/api/v1/offices/2k')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('id is not a number');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('should return a 404 if party id was not found', (done) => {
      const party = {
        name: 'abundance people',
      };
      api.patch('/api/v1/parties/30/name')
        .set('Content-Type', 'application/json')
        .send(party)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Could not find political party');
          done();
        });
    });
  });
  describe('DELETE /parties/:id', () => {
    it('should return a 404 if party id was not found', (done) => {
      api.delete('/api/v1/parties/30')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Could not find political party');
          done();
        });
    });
    it('should return 400 if the id is not a number', (done) => {
      api.get('/api/v1/parties/y2k')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('id is not a number');
          expect(res.body.status).to.equal(400);
          done();
        });
    });
    it('should return a  success message if party was successfuly deleted', (done) => {
      api.delete('/api/v1/parties/2')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('message');
          expect(res.body.data.message).to.equal('Political party has been deleted successfully');
          done();
        });
    });
  });
});
describe('home', () => {
  describe('page not found', () => {
    it('should return a 404 if page cannot be found', (done) => {
      api.get('/api/v1/office')
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.have.equal(404);
          expect(res.body.error).to.equal('Page Not Found');
          done();
        });
    });
  });
});
