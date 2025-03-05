// tests/server.test.js
const request = require('supertest');
const express = require('express');
const app = express();

// Route simple pour le test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API fonctionne correctement' });
});

describe('Tests de routes de base', () => {
  test('Route /api/test doit retourner un statut 200', async () => {
    const response = await request(app).get('/api/test');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });
});