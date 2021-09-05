const { mockRequest, mockResponse } = require('jest-mock-req-res');
const httpError = require('http-errors');

const classroomController = require('./classroom.controller');
const classroomService = require('./classroom.service');

jest.mock('./classroom.service');


describe('Classroom entitás tesztjei', () => {
    const mockData = [
        { _id: 1, "name": "1B" },
        { _id: 2, "name": "2B" },
        { _id: 3, "name": "3C" },
        { _id: 4, "name": "4D" },
        { _id: 5, "name": "1D" },
        { _id: 6, "name": "1F" },
        { _id: 7, "name": "3F" }
    ];
    const nextFunction = jest.fn();
    let response;

    beforeEach(() => {
        classroomService.__setMockData(mockData);
        response = mockResponse();
    })

    test('Create művelet megfelelő body tartalommal', () => {
        const newClassRoom = { name: "ZX3" };
        const request = mockRequest({ body: newClassRoom });

        return classroomController.create(request, response, nextFunction)
            .then(() => {
                expect(classroomService.create).toHaveBeenCalled();
                expect(response.json).toBeCalledWith(mockData.find(c => c._id === 8));
            })
    });

    test('Create művelet hiányos body tartalommal', () => {
        const newClassroom = {};
        const request = new mockRequest({ body: newClassroom });

        classroomController.create(request, response, nextFunction);
        expect(nextFunction).toBeCalledWith(new httpError.BadRequest('ValidationError: name: Path `name` is required.'));
    });

    test('FindAll', () => {
        const request = mockRequest();

        return classroomController.findAll(request, response, nextFunction)
            .then(() => expect(classroomService.findAll).toHaveBeenCalled())
    });

    test('FindOne', () => {
        const ID = 1;
        const request = new mockRequest({
            params: {
                id: ID
            }
        });

        return classroomController.findOne(request, response, nextFunction).then(
            expect(classroomService.findOne).toHaveBeenCalled()
        )
    });

    test('DeleteOne', () => {
        const ID = 1;
        const request = new mockRequest({
            params: {
                id: ID
            }
        });

        return classroomController.delete(request, response, nextFunction)
            .then(() => {
                expect(response.json).toBeCalledWith({});
            });
    });

    test('Update a classroom', () => {
        const ID = 1;
        const updatedClassroom = { name: "IKB" }
        const request = new mockRequest({
            params: {
                id: ID
            },
            body: updatedClassroom
        });

        return classroomController.update(request, response, nextFunction)
            .then(() => {
                expect(classroomService.update).toBeCalledWith(ID, updatedClassroom);
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
        return classroomController.delete(request, response, nextFunction).then(() => {
            expect(classroomService.delete).toBeCalledWith(ID)
        })
    })
});