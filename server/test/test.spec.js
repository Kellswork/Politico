import { expect } from 'chai';
import supertest from 'supertest';
import server from '../app';

const api = supertest(server);
let token;
describe('tests for user controller', () => {
  describe('/POST create user', () => {
    it('should create a new user', (done) => {
      const user = {
        firstName: 'ekanem',
        lastName: 'tobi',
        otherName: 'tobilish',
        email: 'tobi@gmail.com',
        password: '12345',
        phoneNumber: '09088776654',
        passportUrl: 'http://res.cloudinary.com/dghlhphlh/image/upload/v1549405597/fxbi2njrucdsxielitcu.jpg',
      };
      api.post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          token = res.body.data.token;
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('user');
          expect(res.header).to.have.property('x-auth-token');
          done();
        });
    });
  });
  describe('/POST user login', () => {
    const user = {
      email: 'tobi@gmail.com',
      password: '12345',
    };
    it('should login a user', (done) => {
      api.post('/api/v1/auth/login')
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          expect(res.body.data).to.have.property('user');
          expect(res.header).to.have.property('x-auth-token');
          done();
        });
    });
  });
});

describe('tests for party controller', () => {
  describe(' Get /parties', () => {
    it('should get all parties', (done) => {
      api.get('/api/v1/parties')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
  describe(' Get /parties/:id', () => {
    it('should get one party', (done) => {
      api.get('/api/v1/parties/1')
        .set('x-auth-token', token)
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
    it('should return 400 if the id is not a number', (done) => {
      api.get('/api/v1/parties/2k')
        .set('x-auth-token', token)
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
  });
});
describe('tests for offices controller', () => {
  describe(' Get /offices', () => {
    it('should get all offices', (done) => {
      api.get('/api/v1/offices')
        .set('x-auth-token', token)
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
  describe(' Get /offices/:id', () => {
    it('should get one office', (done) => {
      api.get('/api/v1/offices/1')
        .set('x-auth-token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('office');
          expect(res.body.status).to.equal(200);
          expect(res.body.office).to.have.property('id');
          expect(res.body.office).to.have.property('type');
          expect(res.body.office).to.have.property('name');
          done();
        });
    });
    it('should return a 404 if the political office was not found', (done) => {
      api.get('/api/v1/offices/16')
        .set('x-auth-token', token)
        .expect(404)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.equal(404);
          expect(res.body.error).to.equal('office not found');
          done();
        });
    });
  });
});
