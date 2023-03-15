const request = require('supertest');
const express = require('express');
const router = require('../src/routes/artist.router');


const app = express();
app.use('/api/v1/artist', router);

describe('GET /', () => {
    
    it('responds with 200 status code', async () => {
        const response = await request(app).get('/api/v1/artist?artistName=Cher');
        expect(response.statusCode).toBe(200);
    });

    it('responds with 500 status code when missing required param', async () => {
        const response = await request(app).get('/api/v1/artist');
        expect(response.statusCode).toBe(500);

    });

});