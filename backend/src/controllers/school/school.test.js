const { mockRequest, mockResponse } = require('jest-mock-req-res');
const httpError = require('http-errors');

const schoolController = require('./school.controller');
const schoolService = require('./school.service');

jest.mock('./school.service');


describe('School entitás tesztjei', () => {
    const mockData = [
        { _id: 1, name: "Heros School", city: "Budapest", zipcode: 1035, street: "Béke tér 10", classroom: [] },
        { _id: 2, name: "Great Maths", city: "New York", zipcode: 90170, street: "Time Square 2", classroom: [] },
        { _id: 3, name: "Paris School", city: "Paris", zipcode: 22221, street: "Boulervard 3", classroom: [] },
        { _id: 4, name: "Berlin Royal School", city: "Berlin", zipcode: 34055, street: "Hilfe strasse. 3", classroom: [] },
        { _id: 5, name: "London King School", city: "London", zipcode: 99032, street: "Buckingham str. 7", classroom: [] }
    ]
    const nextFunction = jest.fn();
    let response;

    beforeEach(() => {
        schoolService.__setMockData(mockData);
        response = mockResponse();
    })

    test('Create művelet megfelelő body tartalommal', () => {
        const newSchool = { name: "T360_PM great School", city: "Budapest", zipcode: 1111, street: "Ferenciek tere" };
        const request = mockRequest({ body: newSchool });

        return schoolController.create(request, response, nextFunction)
            .then(() => {
                expect(schoolService.create).toHaveBeenCalled();
                expect(response.json).toBeCalledWith(mockData.find(c => c._id === 6));
            })
    });

    test('Create művelet hiányos body tartalommal', () => {
        const newSchool = { name: "T360_PM great School", city: "Budapest", zipcode: 1111 };
        const request = new mockRequest({ body: newSchool });

        schoolController.create(request, response, nextFunction);
        expect(nextFunction).toBeCalledWith(new httpError.BadRequest('ValidationError: street: Path `street` is required.'));
    });

    test('FindAll', () => {
        const request = mockRequest();

        return schoolController.findAll(request, response, nextFunction)
            .then(() => expect(schoolService.findAll).toHaveBeenCalled())
    });

    test('FindOne', () => {
        const ID = 1;
        const request = new mockRequest({
            params: {
                id: ID
            }
        });

        return schoolController.findOne(request, response, nextFunction).then(
            expect(schoolService.findOne).toHaveBeenCalled()
        )
    });

    test('DeleteOne', () => {
        const ID = 1;
        const request = new mockRequest({
            params: {
                id: ID
            }
        });

        return schoolController.delete(request, response, nextFunction)
            .then(() => {
                expect(response.json).toBeCalledWith({});
            });
    });

    test('Update a School', () => {
        const ID = 1;
        const updatedSchool = { name: "T360_PM great School", city: "Budapest", zipcode: 1111, street: "Ferenciek tere 1" };
        const request = new mockRequest({
            params: {
                id: ID
            },
            body: updatedSchool
        });

        return schoolController.update(request, response, nextFunction)
            .then(() => {
                expect(schoolService.update).toBeCalledWith(ID, updatedSchool);
                expect(response.json).toBeCalledWith(mockData.find(c => c._id === 1));
            })
    });

    test('DeleteOne calledWith id', () => {
        const ID = 1;
        const request = new mockRequest({
            params: {
                id: ID
            }
        });
        return schoolController.delete(request, response, nextFunction).then(() => {
            expect(schoolService.delete).toBeCalledWith(ID)
        })
    })
});