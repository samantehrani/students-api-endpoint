var students = require('./students.json');

var db = {
    getStudent: (id) => {
        for (let student of students) {
            if (student.id === id) {
                let res = Object.assign({}, student);
                delete res.full_bio;
                return res;
            }
        }
        return false;
    },
    getAllStudents: () => {
        return students.map((student) => { return { id: student.id, first_name: student.first_name, last_name: student.last_name }; });
    },
    getStudentBio: (id) => {
        for (let student of students) {
            if (student.id === id) {
                return { id: student.id, full_bio: student.full_bio, excerpt: student.excerpt };
            }
        }
        return false;
    }
};


module.exports = db;