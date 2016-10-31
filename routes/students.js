var express = require('express');
var router = express.Router();
var db = require('../db');

router.post('/', function(req, res, next) {
    console.log('here');
    console.log(req.body);
    let newStudent = {
        first_name: req.body.first_name || '',
        last_name: req.body.last_name || '',
        email: req.body.email || '',
        excerpt: req.body.excerpt || '',
        full_bio: req.body.full_bio || '',
        links: ((urls) => {
            let links = [];
            for (url of urls) {
                links.push({ url: url, name: '', id: links.length });
            }
            return links;
        })(req.body.url)
    };

    db.addStudent(newStudent);
    res.json('success');
});
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