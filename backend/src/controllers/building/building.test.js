const { mockRequest, mockResponse } = require('jest-mock-req-res');
const httpError = require('http-errors')
const buildingController = require('./building.controller');
const buildingService = require('./building.service');

jest.mock('./building.service');


describe('Building végpont műveleteinek tesztjei', () => {
    const mockClassesData = [
        { _id: 1, "name": "1B" },
        { _id: 2, "name": "2B" },
        { _id: 3, "name": "3C" },
        { _id: 4, "name": "4D" },
        { _id: 5, "name": "1D" },
        { _id: 6, "name": "1F" },
        { _id: 7, "name": "3F" }
    ];

    let mockBuildingsData = [
        { _id: 1, name: "A block", floors: 2, "classrooms": [] },
        { _id: 2, name: "B block", floors: 3, "classrooms": [] },
        { _id: 3, name: "C block", floors: 4, "classrooms": [] },
        { _id: 4, name: "D block", floors: 3, "classrooms": [] },
        { _id: 5, name: "E block", floors: 1, "classrooms": [] }
    ];

    const nextFunction = jest.fn();
    let response;

    beforeEach(() => {
        buildingService.__setMockData(mockClassesData, mockBuildingsData);
        response = mockResponse();
    });

    test('Új classroom sikeres mentése esetén visszatér a building benne az új class id-val', () => {
        const request = new mockRequest({
            body: {
                buildingId: 5,
                className: "6X"
            }
        })
        return buildingController.updateBuilding(request, response, nextFunction)
            .then(() => {
                expect(buildingService.update).toHaveBeenCalled();
                expect(response.json).toBeCalledWith(mockBuildingsData.find(b => b._id === 5));
            })
    });

    test('Hiányos érték esetén hibaüzenettel tér vissza a controller egy', () => {
        const request = new mockRequest({
            body: {
                name: "A10"
            }
        })
        buildingController.updateBuilding(request, response, nextFunction);
        expect(nextFunction).toBeCalledWith(new httpError.BadRequest('Missing field'));
    });

    test('Populát értékekkel tér vissza a GET kérés', () => {
        const request = new mockRequest({});

        buildingService.__setMockData(mockClassesData, [
            { _id: 1, name: "A block", floors: 2, "classrooms": [] },
            { _id: 2, name: "B block", floors: 3, "classrooms": [1] },
        ]);

        return buildingController.getAllBuildingWithClassrooms(request, response, nextFunction)
            .then(() => {
                expect(buildingService.getAll).toHaveBeenCalled();
                expect(response.json).toBeCalledWith([
                    { _id: 1, name: "A block", floors: 2, "classrooms": [] },
                    { _id: 2, name: "B block", floors: 3, "classrooms": [{ _id: 1, name: "1B" }] },
                ]);
            })
    })
})