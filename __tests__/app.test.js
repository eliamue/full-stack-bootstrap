import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Items from '../lib/models/Items.js';

describe('CRUD routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a new item', async () => {
    const item = {
      title: 'A Title',
      textfield: 'Lorem Ipsum nonsense',
      website: 'https://www.zombo.com/',
      logo: 'https://thiscatdoesnotexist.com/',
      truthy_thing: true,
      number_thing: 222,
    };

    const res = await request(app).post('/api/v1/items').send(item);

    expect(res.body).toEqual({
      id: '1',
      ...item,
    });
  });

  it('gets all items', async () => {
    const item1 = await Items.insert({
      title: 'A Title',
      textfield: 'Lorem Ipsum nonsense',
      website: 'https://www.zombo.com/',
      logo: 'https://thiscatdoesnotexist.com/',
      truthy_thing: true,
      number_thing: 222,
    });

    const item2 = await Items.insert({
      title: 'A Different Title',
      textfield: 'Lorem Ipsum nonsense take 2',
      website: 'https://creedthoughtsgov.com/',
      logo: 'https://this-person-does-not-exist.com/en',
      truthy_thing: false,
      number_thing: 2222,
    });

    const item3 = await Items.insert({
      title: 'A Third Title',
      textfield: 'Lorem Ipsum nonsense take 3',
      website: 'https://mobile.twitter.com/wilfred_warrior',
      logo: 'https://pbs.twimg.com/profile_images/1062259382858211328/GBB8zBh2_400x400.jpg',
      truthy_thing: true,
      number_thing: 22222,
    });

    const res = await request(app).get('/api/v1/companies');

    expect(res.body).toEqual([item1, item2, item3]);
  });

  it('gets one item by id', async () => {
    const item = await Items.insert({
      title: 'A Title',
      textfield: 'Lorem Ipsum nonsense',
      website: 'https://www.zombo.com/',
      logo: 'https://thiscatdoesnotexist.com/',
      truthy_thing: true,
      number_thing: 222,
    });

    const res = await request(app).get(`/api/v1/items/${item.id}`);

    expect(res.body).toEqual(item);
  });

  it('updates a item', async () => {
    const item = await Items.insert({
      title: 'A Title',
      textfield: 'Lorem Ipsum nonsense',
      website: 'https://www.zombo.com/',
      logo: 'https://thiscatdoesnotexist.com/',
      truthy_thing: true,
      number_thing: 222,
    });

    const res = await request(app).put(`/api/v1/items/${item.id}`).send({
      truthy_thing: false,
    });
    expect(res.body).toEqual({
      ...item,
      truthy_thing: false,
    });
  });

  it('deletes a specific existing item', async () => {
    const item = await Items.insert({
      title: 'A Title',
      textfield: 'Lorem Ipsum nonsense',
      website: 'https://www.zombo.com/',
      logo: 'https://thiscatdoesnotexist.com/',
      truthy_thing: true,
      number_thing: 222,
    });

    const res = await request(app).delete(`/api/v1/items/${item.id}`);

    expect(res.body).toEqual({
      message: `You have deleted ${item.title}.`,
    });
  });
});
