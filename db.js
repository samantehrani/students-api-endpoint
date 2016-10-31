let students = require('./students.json');
let fs = require('fs');

// later I am going to change this file based database system to a mongoDB instance.
//var mongodb = require('mongodb');


let db = {
    getStudent: (id) => {
        for (let student of students) {
            if (student.id === id) {
                let res = Object.assign({}, student); // cloning the student object
                delete res.full_bio; // removing the full bio
                return res;
            }
        }
        return false;
    },
    getAllStudents: () => {
        // Mapping the array in order to remove details and only keep id,first_name and last_name
        return students.map((student) => { return { id: student.id, first_name: student.first_name, last_name: student.last_name }; });
    },
    getStudentBio: (id) => {
        for (let student of students) {
            if (student.id === id) {
                return { id: student.id, full_bio: student.full_bio, excerpt: student.excerpt };
            }
        }
        return false;
    },
    addStudent: (student) => {
        student.id = students.length;
        students.push(student);
        
        //writing the changes back to file
        db.updateFile();
    },
    updateFile: () => {
        fs.writeFile('./students.json', JSON.stringify(students), (err) => {
            if (err)
                console.log('File not updated');
            console.log('File updated!');
        });
    }
};



module.exports = db;