const request = require('supertest');
const app = require('../app')
const validUser = {
    username: 'Admin',
    role: 'Admin',
    password: 'password'
}
const invalidPassword = {
    username: 'Admin',
    role: 'Admin',
    password: 'falsepassword'
}

const invalidUsername = {
    username: 'falseAdmin',
    role: 'Admin',
    password: 'password'
}

describe('User routes testing', ()=> {
    describe('POST /login', ()=> {
        test('Login Success', function(done) {
            return request(app)
                .post('/login')
                .send(validUser)
                .then(response => {
                    const {body,status} = response;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty('access_token');
                    done();
                });
        });
        test('Login Failure (Invalid Password)', function(done) {
            return request(app)
                .post('/login')
                .send(invalidPassword)
                .then(response => {
                    const {body,status} = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty('message', 'Incorrect Email/Password');
                    done();
                });
        });
        test('Login Failure (Username Does Not Exist)', function(done) {
            return request(app)
                .post('/login')
                .send(invalidUsername)
                .then(response => {
                    const {body,status} = response;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty('message', 'Incorrect Email/Password');
                    done();
                });
        });
    });
});