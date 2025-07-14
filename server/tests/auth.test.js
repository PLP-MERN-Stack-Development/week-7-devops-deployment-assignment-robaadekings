const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Auth Routes', () => {
  beforeAll(async () => {
    await mongoose.connect(global._MONGO_URI_ || process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  it('registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'jestUser',
      email: 'jest@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('fails duplicate email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'dupUser',
      email: 'jest@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(400);
  });
});