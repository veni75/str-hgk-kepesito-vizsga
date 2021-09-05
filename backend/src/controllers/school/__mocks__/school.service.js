const schoolService = jest.mock('./school.service');

let mockData;

schoolService.create = jest.fn(school => {
    let bigesstId = Math.max(...mockData.map(s => s._id));
    school._id = ++bigesstId;
    mockData.push(school);
    return Promise.resolve(school);
});

schoolService.__setMockData = data => mockData = data;

schoolService.findOne =
    jest.fn(id => Promise.resolve(mockData.find(s => s._id === id)));


schoolService.update = jest.fn((id, school) => new Promise((res, rej) => {
    const index = mockData.findIndex(c => c._id === id);
    if (index >= 0) {
        school._id = id;
        mockData.splice(index, 1, school);
        res(school);
    }
}));

schoolService.findAll = jest.fn(() => Promise.resolve(mockData));


schoolService.delete = jest.fn(id => {
    const index = mockData.findIndex(s => s._id === id);
    return Promise.resolve({});
})


module.exports = schoolService;