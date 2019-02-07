import { expect } from 'chai';
import supertest from 'supertest';
import server from '../app';
import user from './dummyData';

const api = supertest(server);

describe('tests for user controller', () => {
  describe('/POST create user', () => {
    it('should create a new user', (done) => {
      api.post('/api/v1/auth/signup')
        // .set('Content-Type', 'application/form-data')
        .send(user)
        .end((err, res) => {
          console.log(res.body);
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
});
