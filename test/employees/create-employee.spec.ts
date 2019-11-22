import testServer from '../test-server';

import request from 'supertest';

describe('POST /employees', () => {
  it('should fail when name is missing', () => {
    request(testServer)
      .post('/employees')
      .send({})
      .expect(400)
      .then(res => expect(res.body.errors.name).toContain('this field is required'));
  });

  it('should fail when name is null', async () => {
    request(testServer)
      .post('/employees')
      .send({ name: null })
      .expect(400)
      .then(res => expect(res.body.errors.name).toContain('this field is required'));
  });

  it('should fail when name is empty', async () => {
    request(testServer)
      .post('/employees')
      .send({ name: '' })
      .expect(400)
      .then(res => expect(res.body.errors.name).toContain('this field is required'));
  });

  it('should fail when name is too short', async () => {
    request(testServer)
      .post('/employees')
      .send({ name: 'abc' })
      .expect(400)
      .then(res => expect(res.body.errors.name).toContain('must be 4 to 10 chars long'));
  });

  it('should fail when name is too long', async () => {
    request(testServer)
      .post('/employees')
      .send({ name: 'a very very long name' })
      .expect(400)
      .then(res => expect(res.body.errors.name).toContain('must be 4 to 10 chars long'));
  });

  it('should return 201', async () => {
    const name = 'Steven';
    request(testServer)
      .post('/employees')
      .send({ name: name })
      .expect(201)
      .then(res => expect(res.body.name).toBe(name));
  });
});
