const classroomService = jest.mock('./classroom.service');

let mockData;

classroomService.create = jest.fn(classRoom => {
    let bigesstId = Math.max(...mockData.map(c => c._id));
    classRoom._id = ++bigesstId;
    mockData.push(classRoom);
    return Promise.resolve(classRoom);
});

classroomService.__setMockData = data => mockData = data;

classroomService.findOne =
    jest.fn(id => Promise.resolve(mockData.find(c => c._id === id)));


classroomService.update = jest.fn((id, newClass) => new Promise((res, rej) => {
    const index = mockData.findIndex(c => c._id === id);
    if (index >= 0) {
        newClass._id = id;
        mockData.splice(index, 1, newClass);
        res(newClass);
    }
}));

classroomService.findAll = jest.fn(() => Promise.resolve(mockData));


classroomService.delete = jest.fn(id => {
    const index = mockData.findIndex(c => c._id === id);
    return Promise.resolve({});
})


module.exports = classroomService;