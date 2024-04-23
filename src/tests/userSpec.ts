import { UserStore } from '../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  //Deleting the user which was created in beforeAll()
  it('delete method should remove the user', async () => {
    await store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method should add new user', async () => {
    const result = await store.create({
      id: 2,
      firstname: 'mohsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: '123abc'
    });

    expect(result).toEqual({
      id: 2,
      firstname: 'mohsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: result.password // Compare with the hashed password
    });
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      firstname: 'mohsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: result.password
    });
  });

  it('delete method should remove the user', async () => {
    await store.delete('2');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
