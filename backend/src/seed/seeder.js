const mongoose = require('mongoose');

const Student = require('../models/student.model');
const Classroom = require('../models/classroom.model');
const School = require('../models/school.model');
const Building = require('../models/building.model');


const fsp = require('fs').promises;


const seedCollection = async(model, fileName) => {
    try {
        const exists = await model.countDocuments();
        if (!exists) {
            throw new Error();
        }
    } catch (e) {
        const source = await fsp.readFile(
            `./src/seed/${fileName}.json`,
            'utf8'
        );
        const list = JSON.parse(source);
        if (model && model.insertMany) {
            await model.insertMany(list, { limit: 10 });
        }
    }
};

(async() => {
    try {
        await Student.db.dropCollection('students');
        await Classroom.db.dropCollection('classrooms');
        await School.db.dropCollection('schools');
        await Building.db.dropCollection('buildings');

    } catch (e) {
        console.log('Entity list NOT FOUND');
    }
    seedCollection(Student, 'students');
    seedCollection(School, 'schools');
    seedCollection(Classroom, 'classrooms');
    seedCollection(Building, 'buildings');

})()
