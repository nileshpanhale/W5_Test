const chai = require('chai');
let { expect, assert } = require('chai');
const knex = require('knex');
import { signUp, signIn, getRegisteredUsers } from 'src files of funtions';

describe('PostgreSQL Connection Test', () => {
    it('should connect to PostgreSQL database', async () => {
        const db = knex({
            client: 'pg',
            connection: {
                host: 'localhost',
                user: 'your_username',
                password: 'your_password',
                database: 'your_database',
            },
        });

        try {
            await db.raw('SELECT 1+1');
            expect(true).to.be.true;
        } catch (error) {
            expect.fail(error.message);
        } finally {
            await db.destroy();
        }
    });
});

describe('User sign-up', () => {
    it('should create a new user with a unique username and password', async function () {
        const newUser = {
            username: 'testUser',
            password: 'test123',
        };
        const result = await signUp(newUser);
        expect(result).to.deep.equal({
            message: 'User created successfully',
            user: {
                username: 'testUser',
            },
        });
    });

    it('should return an error if the username already exists', async function () {
        const existingUser = {
            username: 'testUser',
            password: 'test123',
        };
        // signUp(existingUser);
        const result = await signUp(existingUser);
        expect(result).to.deep.equal({
            message: 'Username already exists',
        });
    });

    it('should return an error if the username or password is missing', async function () {
        const missingUser = {
            username: '',
            password: 'test123',
        };
        const missingPassword = {
            username: 'testUser',
            password: '',
        };
        const result1 = await signUp(missingUser);
        const result2 = await signUp(missingPassword);
        expect(result1).to.deep.equal({
            message: 'Username or password missing',
        });
        expect(result2).to.deep.equal({
            message: 'Username or password missing',
        });
    });
});


describe('User sign-in', () => {
    it('should return a success message if the username and password are valid', async function () {
        const credentials = {
            username: 'testUser',
            password: 'test123',
        };
        const result = await signIn(credentials);
        expect(result).to.deep.equal({
            message: 'User signed in successfully',
            user: {
                username: 'testUser',
            },
        });
    });

    it('should return an error message if the username is invalid', async function () {
        const invalidUsername = {
            username: 'testUser',
            password: 'test123',
        };
        const result = await signIn(invalidUsername);
        expect(result).to.deep.equal({
            message: 'Invalid username or password',
        });
    });

    it('should return an error message if the password is invalid', async function () {
        const invalidPassword = {
            username: 'testUser',
            password: 'wrongpassword',
        };
        const result = await signIn(invalidPassword);
        expect(result).to.deep.equal({
            message: 'Invalid username or password',
        });
    });

    it('should return an error message if the username or password is missing', async function () {
        const missingUsername = {
            username: '',
            password: 'test123',
        };
        const missingPassword = {
            username: 'testUser',
            password: '',
        };
        const result1 = await signIn(missingUsername);
        const result2 = await signIn(missingPassword);
        expect(result1).to.deep.equal({
            message: 'Username or password missing',
        });
        expect(result2).to.deep.equal({
            message: 'Username or password missing',
        });
    });
});

describe('Get registered user list', () => {
    it('should return a list of all registered users', async function () {
        const result = await getRegisteredUsers();
        expect(result).to.deep.equal([
            {
                username: 'testUser',
                password: 'test123',
            },
            {
                username: 'testUser1',
                password: 'test123',
            },
            {
                username: 'testUser2',
                password: 'test123',
            },
        ]);
    });
});
