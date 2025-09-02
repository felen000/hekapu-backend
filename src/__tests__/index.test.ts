import app from '../app.js';
import request from 'supertest';

describe('app', () => {
    it('Should return a 200 response', async () => {
        const res = await request(app)
            .get('/posts')

        expect(res.status).toBe(200);
    })
})