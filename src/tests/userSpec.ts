import { User, UserStore } from '../models/user';

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

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });


  it('create method should add new user', async () => {
 
    const result = await store.create({
      id: 1,
      firstname: 'ahsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: '123abc' 
    });
  
    expect(result).toEqual({
      id: 1,
      firstname: 'ahsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: result.password // Compare with the hashed password
    });
  });
  

 
  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      firstname: 'ahsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: result.password
    });
  });


  it('delete method should remove the book', async () => {
      store.delete("1");
      const result = await store.index()

      expect(result).toEqual([]);
  });


});
