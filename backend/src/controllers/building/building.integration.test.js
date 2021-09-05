const mongoose = require('mongoose');
const config = require('config');
const request = require('supertest');
const app = require('../../server');
const httpError = require('http-errors');

const host = config.has('database.host') ? config.get('database.host') : 'mongodb://localhost:27017/testDiary';

const BuildingModel = require('../../models/building.model');


describe('Building end pont integrált tesztjei', () => {
    let server;

    const mockBuildingsData = [
        { name: "A block", floors: 2, classrooms: [] },
        { name: "B block", floors: 3, classrooms: [] },
        { name: "C block", floors: 4, classrooms: [] },
        { name: "D block", floors: 3, classrooms: [] },
        { name: "E block", floors: 1, classrooms: [] }
    ];

    beforeAll(async() => {
        try {
            await mongoose.connect(host, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
            console.info(`MongoDB connection is successful on:${host}`);
        } catch (e) {
            console.log(e);
        }
    });

    afterEach(async() => {
        await mongoose.connection.db.dropCollection('buildings');
    });

    afterAll(async() => {
        await mongoose.connection.db.dropDatabase('testDiary');
        mongoose.connection.close();
    });

    test('PUT kéréssel új az id-t tartalmazza a válasz', async() => {
        const newBuilding = new BuildingModel(mockBuildingsData[0])
        const savedBuilding = await newBuilding.save();
        const building_id = savedBuilding._id;

        const response = await request(app)
            .put('/building')
            .send({ buildingId: building_id, className: "WX" });

        expect(response.status).toBe(200);
        expect(response.body.classrooms.length).not.toBe(0);
        expect(response.body.name).toBe('A block');
    });

    test('PUT kérés hiányos adatok esetn hibaüzenettel tér vissza', async() => {
        const newBuilding = new BuildingModel(mockBuildingsData[0])
        await newBuilding.save();

        const response = await request(app)
            .put('/building')
            .send({ className: "WX" });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            hasError: true,
            message: "Missing field"
        });
    });

    test('GET kérés a populált listát adja vissza', async() => {
        const newBuilding = new BuildingModel(mockBuildingsData[0])
        const savedBuilding = await newBuilding.save();
        const building_id = savedBuilding._id;

        await request(app)
            .put('/building')
            .send({ buildingId: building_id, className: "WX" });

        const populatedResponse = await request(app)
            .get('/building');

        expect(populatedResponse.body[0].classrooms[0].name).toBe('WX');
    })
})
