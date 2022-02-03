// const { use } = require('chai');
const request = require('supertest');
const app = require('../src/server/server');
// const index = require('../src/components/User/index');
// const { findById } = require('../src/components/User/service');

describe('Test the /v1/users path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/v1/users').send(
            {
                _id: '61b10cf39a60350ec5428e27', fullName: 'Sign U00p2', email: 'SignUp123@gmail.com', password: '$2b$10$apj/srDJIkSNdz2JONfWPONtknV4hM9kMgyWXCrWlx6cxQEx8hmzy',
            },
            {
                _id: '61b11aa4fc218c7bfb204ce0', fullName: 'Sign 0000', email: 'SignUp0000@gmail.com', password: '$2b$10$tk4dRLsd66kXjQmXfdD2D.oelWA63r.cFl2gA5467lMEaecAd2Tji',
            },
            {
                _id: '61ba55dc19b363a63611ef83', fullName: 'Hash johny', email: 'jhash@gmail.com', password: 'dbdb',
            },
        );
        expect(response.statusCode).toBe(200);
    });

    test('It should NOT response to the GET method', async () => {
        const response = await request(app).get('/v1/users');
        const users = {
            data: [
                {
                    _id: '61b10cf39a60350ec5428e27',
                    fullName: 'Sign U00p2',
                    email: 'SignUp123@gmail.com',
                    password: '$2b$10$apj/srDJIkSNdz2JONfWPONtknV4hM9kMgyWXCrWlx6cxQEx8hmzy',
                },
                {
                    _id: '61b11aa4fc218c7bfb204ce0',
                    fullName: 'Sign 0000',
                    email: 'SignUp0000@gmail.com',
                    password: '$2b$10$tk4dRLsd66kXjQmXfdD2D.oelWA63r.cFl2gA5467lMEaecAd2Tji',
                },
            ],
        };
        expect(response.body).toEqual(users);
    });
});

describe('Test the (find user by id) GET /v1/users/:id path', () => {
    test('It should pass', async () => {
        const response = await (await request(app).get('/v1/users/61b10cf39a60350ec5428e27'));
        const users = {
            data: {
                _id: '61b10cf39a60350ec5428e27',
                fullName: 'Sign U00p2',
                email: 'SignUp123@gmail.com',
                password: '$2b$10$apj/srDJIkSNdz2JONfWPONtknV4hM9kMgyWXCrWlx6cxQEx8hmzy',
            },
        };
        expect(response.body).toEqual(users);
    });

    test('It should NOT pass', async () => {
        const response = await (await request(app).get('/v1/users/661ba55dc19b363a63611ef83'));
        const users = {
            data: {
                _id: '61ba55dc19b363a63611ef83',
                fullName: 'Hash johny',
                email: 'jhash@gmail.com',
                password: 'dbdb',
            },
        };
        expect(response.body).toEqual(users);
    });
});

describe('Test the (CREATE USER) post /v1/users/', () => {
    test('It should Create user', async () => {
        const response = await (await request(app).post('/v1/users').send({
            fullName: 'Johny Be Good',
            email: 'Good@gmail.com',
        }));
        expect(response.statusCode).toBe(200);
    });

    test('It should NOT Create user', async () => {
        const response = await (await request(app).post('/v1/users').send({
            fullName1: 'Johny Be Good',
            email: 'Good@gmail.com',
        }));
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the (DELETE USER by id) post /v1/users/', () => {
    test('It should delete user', async () => {
        const response = await (await request(app).delete('/v1/users').send('id=61fbf74a7d4d92395c910bf1'));
        expect(response.statusCode).toBe(200);
    });

    test('It should NOT delete user', async () => {
        const response = await (await request(app).delete('/v1/users').send('id=61fbf74a7d4d92395c910bf11'));
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the (UPDATE USER by id) post /v1/users/', () => {
    test('It should update user', async () => {
        const response = await (await request(app).put('/v1/users').send({ id: '61fbf82b726f1a5c41714f9c', fullName: 'Hello There' }));
        expect(response.statusCode).toBe(200);
    });

    test('It should NOT update user', async () => {
        const response = await (await request(app).put('/v1/users').send({ id: '61fbf82b726f1a5c41714f9', fullName: 'Hello There' }));
        expect(response.statusCode).toBe(200);
    });
});
