import { expect, assert } from "chai";
import knex from "knex";
import { init } from "../src/app";
import userController from "../src/modules/user/authController";

describe("PostgreSQL Connection Test", async () => {
    let db;
    const server = await init();
    beforeEach(async () => {
        db = knex({
            client: "pg",
            connection: "postgres://<username>:<password>@127.0.0.1:5432/testdb",
        });
    });

    it("should connect to PostgreSQL database", async () => {
        try {
            const x = await db.raw("SELECT 1+1");
            expect(true).to.be.true;
        } catch (error) {
            expect.fail(error.message);
        } finally {
            await db.destroy();
        }
    });

    it("should create a new user with a unique username and password", async function () {
        const UserController = new userController();
        const newUser = {
            username: "testUser6",
            password: "test123",
        };
        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signup",
            payload: newUser,
        });
        assert.equal(200, res.statusCode);
        //const result = await UserController.signUp(newUser);
        expect(res.result).to.deep.equal({ message: "SignUP successfull" });
    });

    it("should return an error if the username already exists", async function () {
        const existingUser = {
            username: "testUser",
            password: "test123",
        };
        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signup",
            payload: existingUser,
        });
        var responseBody = JSON.parse(res.payload);
        assert.equal(400, res.statusCode);
        expect(res.result).to.be.equal('"Username already taken "');
    });

    it("should return an error if the username or password is missing", async function () {
        const missingUser = {
            username: "",
            password: "test123",
        };
        const missingPassword = {
            username: "testUser",
            password: "",
        };

        const resMissing = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signup",
            payload: missingUser,
        });
        var responseBody = JSON.parse(resMissing.payload);
        assert.equal(400, resMissing.statusCode);

        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signup",
            payload: missingPassword,
        });

        assert.equal(400, res.statusCode);
        expect(res.result).to.deep.equal({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid request payload input",
        });
    });
    it("should return a success message if the username and password are valid", async function () {
        const credentials = {
            username: "testUser",
            password: "test123",
        };

        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signin",
            payload: credentials,
        });

        //const result = await signIn(credentials);
        expect(res.result).to.deep.equal({ message: '"SignIn successfull"' });
    });

    it("should return an error message if the username is invalid", async function () {
        const invalidUsername = {
            username: "wrongUsers",
            password: "test123",
        };
        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signin",
            payload: invalidUsername,
        });


        expect(res.result).to.deep.equal({
            message: '"Username not exists"',
            users: [],
        });
    });

    it("should return an error message if the password is invalid", async function () {
        const invalidPassword = {
            username: "testUser",
            password: "wrongpassword",
        };

        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signin",
            payload: invalidPassword,
        });
        // const result = await signIn(invalidPassword);
        expect(res.result).to.deep.equal({
            message: '"Password or usrename did\'t matched "',
        });
    });

    it("should return an error message if the username or password is missing", async function () {
        const missingUsername = {
            username: "",
            password: "test123",
        };
        const missingPassword = {
            username: "testUser",
            password: "",
        };
        const res = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signin",
            payload: missingUsername,
        });
        expect(res.result).to.deep.equal({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid request payload input",
        });
        // const result1 = await signIn(missingUsername);

        const respass = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signin",
            payload: missingPassword,
        });
        expect(respass.result).to.deep.equal({
            statusCode: 400,
            error: "Bad Request",
            message: "Invalid request payload input",
        });
    });

    it("should return a list of all registered users", async function () {
        const credentials = {
            username: "testUser",
            password: "test123",
        };

        const resLogin = await server.inject({
            method: "POST",
            url: "http://localhost:4000/signin",
            payload: credentials,
        });
        let Cookies: any = resLogin.headers["set-cookie"];

        const res = await server.inject({
            method: "GET",
            url: "http://localhost:4000/userlist",
            auth: {
                strategy: "cookie",
                credentials: Cookies[0],
            },
        });

        console.log(res.result);


        // const result = await getRegisteredUsers();
        expect(res.result).to.deep.equal([
            {
                username: "testUser",
                password: "test123",
            },
            {
                username: "testUser1",
                password: "test123",
            },
            {
                username: "testUser2",
                password: "test123",
            },
        ]);
    });
});



