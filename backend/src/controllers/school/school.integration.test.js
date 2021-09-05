const mongoose = require('mongoose');
const config = require('config');
const request = require('supertest');
const app = require('../../server');

const host = config.has('database.host') ? config.get('database.host') : 'mongodb://localhost:27017/testDiary';

const SchoolModel = require('../../models/school.model');


describe('Integrált tesztek a School entitásra', () => {
    let server;

    const schools = [
        { name: "Heros School", city: "Budapest", zipcode: 1035, street: "Béke tér 10", classrooms: [] },
        { name: "Great Maths", city: "New York", zipcode: 90170, street: "Time Square 2", classrooms: [] },
        { name: "Paris School", city: "Paris", zipcode: 22221, street: "Boulervard 3", classrooms: [] },
        { name: "Berlin Royal School", city: "Berlin", zipcode: 34055, street: "Hilfe strasse. 3", classrooms: [] },
        { name: "London King School", city: "London", zipcode: 99032, street: "Buckingham str. 7", classrooms: [] }
    ]

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
        await mongoose.connection.db.dropCollection('schools');
    });

    afterAll(async() => {
        await mongoose.connection.db.dropDatabase('testDiary');
        mongoose.connection.close();
    });

    test('Post kérés érkezik', async() => {
        await SchoolModel.insertMany(schools);

        const response = await request(app)
            .post('/school')
            .send({ name: "PM School", city: "Budapest", zipcode: 1234, street: "Ferenciek tere 1" })

        expect(response.status).toBe(201);
        expect(response.body).toBeTruthy();
        expect(response.body.name).toBe("PM School");
        expect(response.body.city).toBe("Budapest");
        expect(response.body.zipcode).toBe(1234);
        expect(response.body.street).toBe("Ferenciek tere 1");
    });

    test('Get kérés érkezik', async() => {
        await SchoolModel.insertMany(schools);
        const response = await request(app)
            .get('/school');

        expect(response.body.length).toBe(5);
        expect(response.body[3].name).toBe('Berlin Royal School')
    })

    test('Put kérés érkezik a frissitett adatokkal', async() => {
        await SchoolModel.insertMany(schools);
        const allSchoolResponse = await request(app)
            .get('/school');

        const firstSchoolId = allSchoolResponse.body[0]._id;

        const response = await request(app)
            .put(`/school/${firstSchoolId}`)
            .send({
                name: "T360",
                city: "Budapest",
                zipcode: 1035,
                street: "Béke tér 10",
                classrooms: []
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('T360');
    })

    test('Get by ID kérés érkezik', async() => {
        await SchoolModel.insertMany(schools);
        const allSchoolResponse = await request(app)
            .get('/school');

        const firstSchoolId = allSchoolResponse.body[0]._id;

        const response = await request(app)
            .get(`/school/${firstSchoolId}`);

        expect(response.body).toBeTruthy();
        expect(response.body._id).toBe(firstSchoolId);
        expect(response.body.name).toBe('Heros School');
    })

    test('Delete kérés érkezik', async() => {
        await SchoolModel.insertMany(schools);
        const allSchoolResponse = await request(app)
            .get('/school');

        const firstSchoolId = allSchoolResponse.body[0]._id;

        const response = await request(app)
            .delete(`/school/${firstSchoolId}`);

        expect(response.body).toEqual({});
        expect(response.status).toBe(200);
    });
})
