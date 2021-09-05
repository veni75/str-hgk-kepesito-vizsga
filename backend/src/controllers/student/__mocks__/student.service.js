const studentService = jest.mock('./student.service');

let mockData;

studentService.create = jest.fn(student => {
    student._id = 11;
    mockData.push(student);
    return Promise.resolve(student);
});

studentService.__setMockData = data => mockData = data;

studentService.findOne =
    jest.fn(id => Promise.resolve(mockData.find(s => s._id === id)));


studentService.update = jest.fn((id, student) => new Promise((res, rej) => {
    const index = mockData.findIndex(c => c._id === id);
    if (index >= 0) {
        student._id = id;
        mockData.splice(index, 1, student);
        res(student);
    }
}));

studentService.findAll = jest.fn(() => Promise.resolve(mockData));


studentService.delete = jest.fn(id => {
    const index = mockData.findIndex(s => s._id === id);
    return Promise.resolve({});
})


module.exports = studentService;