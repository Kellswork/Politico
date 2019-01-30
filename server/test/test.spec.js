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
          expect(res.body.data).to.have.property('type');
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.have.property('name');

          done();
        });
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
