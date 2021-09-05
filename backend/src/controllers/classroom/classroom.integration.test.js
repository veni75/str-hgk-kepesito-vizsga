const mongoose = require('mongoose');
const config = require('config');
const request = require('supertest');
const app = require('../../server');

const host = config.has('database.host') ? config.get('database.host') : 'mongodb://localhost:27017/testDiary';

const ClassRoomModel = require('../../models/classroom.model');


describe('Integrált tesztek a Classroom entitásra', () => {
    let server;

    const classrooms = [
        { "name": "1B" },
        { "name": "2B" },
        { "name": "3C" },
        { "name": "4D" },
        { "name": "5T" }
    ];

    beforeAll(async() => {
        try {
            await mongoose.connect(host, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })
            console.info(`MongoDB connection is successful on:${host}`);
        } catch (e) {
            console.log(e);
        }
    });

    afterEach(async() => {
        await mongoose.connection.db.dropCollection('classrooms');
    });

    afterAll(async() => {
        await mongoose.connection.db.dropDatabase('testDiary');
        mongoose.connection.close();
    });

    test('Post kérés érkezik', async() => {
        await ClassRoomModel.insertMany(classrooms);

        const response = await request(app)
            .post('/classroom')
            .send({ name: "WX" })

        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body.name).toBe('WX')
    });

    test('Get kérés érkezik', async() => {
        await ClassRoomModel.insertMany(classrooms);
        const response = await request(app)
            .get('/classroom');

        expect(response.body.length).toBe(5);
        expect(response.body[3].name).toBe('4D')
    })

    test('Put kérés érkezik', async() => {
        await ClassRoomModel.insertMany(classrooms);
        const allClassroomsResponse = await request(app)
            .get('/classroom');

        const firstClassId = allClassroomsResponse.body[0]._id;

        const response = await request(app)
            .put(`/classroom/${firstClassId}`)
            .send({ name: "BZ" });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('BZ');
    })

    test('Get by ID kérés érkezik', async() => {
        await ClassRoomModel.insertMany(classrooms);

        const allClassroomsResponse = await request(app)
            .get('/classroom');

        const firstClassId = allClassroomsResponse.body[0]._id;

        const response = await request(app)
            .get(`/classroom/${firstClassId}`);

        expect(response.body).toBeTruthy();
        expect(response.body._id).toBe(firstClassId);
        expect(response.body.name).toBe('1B')

    })

    test('Delete kérés érkezik', async() => {
        await ClassRoomModel.insertMany(classrooms);
        const allClassroomsResponse = await request(app)
            .get('/classroom');

        const firstClassId = allClassroomsResponse.body[0]._id;

        const response = await request(app)
            .delete(`/classroom/${firstClassId}`);
        expect(response.body).toEqual({});
        expect(response.status).toBe(200);
    });
})
