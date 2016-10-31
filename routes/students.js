var fs = require('fs');
var express = require('express');
var router = express.Router();
var db = require('../db');
var multer = require('multer')({ dest: 'uploads/' });

router.post('/', multer.single('profile-picture'), function(req, res, next) {

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
    if (req.file) {
        let date = new Date();
        let temp_dir = `/${req.file.path}`;
        let dest_dir = `/public/images/${date.getTime()}_${req.file.originalname}`;
        fs.rename(`.${temp_dir}`, `.${dest_dir}`, function(err) {
            if (err) {
                console.log(err);
                console.log('FILE NOT MOVED!');
                db.addStudent(newStudent); // add the student info without picture info
            } else {
                newStudent.profile_picture = dest_dir; // add picture path
                db.addStudent(newStudent);
            }

        });
    } else {
        db.addStudent(newStudent); // add the student info without picture info
    }

    res.json('Information Updated!');
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