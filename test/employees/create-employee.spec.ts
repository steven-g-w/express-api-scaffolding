import testServer from '../test-server';

import request from 'supertest';
import { CreateEmployeeDto } from '../../src/data-contract/employee/create-employee-dto';

describe('POST /employees', () => {
  it('should fail when name is missing', async () =>
    await validateInputFailure(dto => delete dto.name,
      res => expect(res.body.errors.name).toContain('this field is required'))
  );

  it('should fail when name is null', async () =>
    await validateInputFailure(dto => dto.name = null,
      res => expect(res.body.errors.name).toContain('this field is required'))
  );

  it('should fail when name is empty', async () =>
    await validateInputFailure(dto => dto.name = '',
      res => expect(res.body.errors.name).toContain('this field is required'))
  );

  it('should fail when name is too short', async () =>
    await validateInputFailure(dto => dto.name = 'abc',
      res => expect(res.body.errors.name).toContain('must be 4 to 16 chars long'))
  );

  it('should fail when name is too long', async () =>
    await validateInputFailure(dto => dto.name = 'a very very long name',
      res => expect(res.body.errors.name).toContain('must be 4 to 16 chars long'))
  );

  it('should fail when name matches magic-trigger', async () =>
    await validateInputFailure(dto => dto.name = 'magic-trigger',
      res => expect(res.body.errors.name).toContain('cannot be magic-trigger'))
  );

  it('should return 201', async () => {
    const name = 'Steven';
    request(testServer)
      .post('/employees')
      .send({ name: name })
      .expect(201)
      .then(res => expect(res.body.name).toBe(name));
  });
});

async function validateInputFailure(mutator: (dto: CreateEmployeeDto) => void, testResponse: (res: request.Response) => void) {
  const dto: CreateEmployeeDto = { name: 'Thomas' };
  mutator(dto);
  await request(testServer)
    .post('/employees')
    .send(dto)
    .expect(400)
    .then(testResponse);
}
