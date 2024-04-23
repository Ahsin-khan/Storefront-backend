import { ProductStore } from '../models/product';

const store = new ProductStore();

describe('Product Model', () => {
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

  //Deleting the product which was created in beforeAll()
  it('delete method should remove the product', async () => {
    await store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method should add new product', async () => {
    const result = await store.create({
      id: 2,
      name: 'cup',
      price: 30,
      category: 'kitchen'
    });

    expect(result).toEqual({
      id: 2,
      name: 'cup',
      price: 30,
      category: 'kitchen'
    });
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      name: 'cup',
      price: 30,
      category: 'kitchen'
    });
  });

  it('update method should update a product', async () => {
    const updatedProduct = {
      id: 2,
      name: 'cup',
      price: 30,
      category: 'kitchen'
    };

    const result = await store.update(updatedProduct);
    expect(result).toEqual(updatedProduct);
  });

  it('delete method should remove the product', async () => {
    await store.delete('2');
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it('category method should return the product according to category', async () => {
    const category = 'kitchen';
    const result = await store.getProductsByCategory(category);
    console.log(result);
    expect(result).toEqual([]);
  });
});
