import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe("Surveys", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    })
    // afterAll(async ()=>{
    //     const connection =  getConnection()
    //     await connection.dropDatabase()
    //     await connection.close()
    // })

    it("deve criar um novo chamado 1 ", async ()=>{
    const res =  await request(app)
    .post('/surveys')
    .send({
       title:"helow bixo",
       description:"saudaçoes"
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id")
    });

    it("deve criar um novo chamado 2", async ()=>{
        await request(app)
        .post('/surveys')
        .send({
           title:"helow bixooo",
           description:"saudaçoes"
        });

        const res =  await request(app).post('/surveys')
        expect(res.body.lenght).toBe(2)

    });
});