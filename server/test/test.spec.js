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
          console.log(res.body);
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
          console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('status');
          expect(res.body.status).to.equal(200);
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
});
