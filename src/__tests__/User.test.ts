import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe("Users", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    })
    afterAll(async ()=>{
        const connection =  getConnection()
        await connection.dropDatabase()
        await connection.close()
    })

    it("deve criar um novo usuario ", async ()=>{
    const res =  await request(app)
    .post('/users')
    .send({
        email: "uss@test.com",
        name:"jow"
    });

    expect(res.status).toBe(201);
    });
    
    it("nao deve criar um novo usuario caso ja exista o email ", async ()=>{
        const res =  await request(app)
        .post('/users')
        .send({
            email: "usuar@test.com",
            name:"jow"
        });

        expect(res.status).toBe(201);
    });
     
})