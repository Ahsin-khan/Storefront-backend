import { OrderStore } from '../models/order';
import { UserStore } from '../models/user';
import { ProductStore } from '../models/product';

const store = new OrderStore();
const user_store = new UserStore();
const product_store = new ProductStore();

describe('Order Model', () => {
  //Since 1 user was already added before in userSpec.ts. This new user will have the id=2
  beforeAll(async () => {
    await user_store.create({
      firstname: 'ahsin',
      lastname: 'khalid',
      username: 'akkhan5955',
      password: '123abc'
    });

    await product_store.create({
      name: 'plate',
      price: 5,
      category: 'kitchen'
    });
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method should add new order', async () => {
    const result = await store.create({
      status: 'active',
      user_id: '1'
    });

    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: '1'
    });
  });

  it('show method should return the correct order', async () => {
    const result = await store.show(1);
    //console.log(result);
    expect(result).toEqual({
      id: 1,
      status: 'active',
      user_id: '1'
    });
  });

  it('update method should update an order', async () => {
    const updatedOrder = {
      id: 1,
      status: 'active',
      user_id: '1'
    };

    const result = await store.update(updatedOrder);
    // console.log(result)
    expect(result).toEqual(updatedOrder);
  });

  it('addProduct method should add quantity, orderId and productId', async () => {
    const quantity = 3;
    const productId = '1';
    const orderId = '1';

    const result = await store.addProduct(quantity, productId, orderId);
    expect(result).toEqual(result);
  });

  //Delete the added Product, otherwise order delete test case gives error of Foreign key constraint
  it('delete method should remove the added Product', async () => {
    // Delete the added product with ID '1'
    const result = await store.deleteAddProduct('1');
    expect(result).toEqual([]);
  });

  it('delete method should remove the order', async () => {
    await store.delete('1');
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
