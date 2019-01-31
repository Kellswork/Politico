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
