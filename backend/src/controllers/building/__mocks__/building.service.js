const buildingService = jest.mock('./building.service');

let mockClassesData;
let mockBuildingsData;

buildingService.__setMockData = (classes, buildings) => {
    mockClassesData = classes;
    mockBuildingsData = buildings;
}

buildingService.update = jest.fn((buildingId, className) => new Promise((res, rej) => {
    let biggestClassId = Math.max(...mockClassesData.map(c => c._id));
    const newClass = {
        _id: ++biggestClassId,
        name: className
    };
    mockClassesData.push(newClass);

    let updatedBuilding;
    mockBuildingsData.forEach(building => {
        if (building._id === buildingId) {
            building.classrooms.push(newClass._id);
            updatedBuilding = building;
        }
    });
    if (updatedBuilding) {
        res(updatedBuilding);
    } else {
        rej('Could not updated building');
    }
}));

buildingService.getAll = jest.fn(() => new Promise((res, rej) => {
    const populatedBuildings = mockBuildingsData
        .map(b => b.classrooms.length === 0 ? {...b } : {...b, classrooms: b.classrooms.map(id => mockClassesData.find(cd => cd._id === id)) })

    res(populatedBuildings);
}));

module.exports = buildingService;