var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
    let list = db.getAllStudents();
    res.json(list);
});

router.get('/:student_id', function(req, res, next) {
    let id = req.params.student_id;
    let student = db.getStudent(id);
    if (student)
        res.json(student);
});

router.get('/:student_id/bio', function(req, res, next) {
    let id = req.params.student_id;
    let bio = db.getStudentBio(id);
    res.json(bio);
});


module.exports = router;