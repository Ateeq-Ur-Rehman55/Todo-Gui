// const Joi = require('joi');
const cors = require('cors')
const express = require('express')
const fs = require('node:fs')
const app = express()
const corsOption = {
    origin: 'http://127.0.0.1:7001',
    optionSuccessStatus: 200
  }
app.use(cors(corsOption));
app.use(express.json())
const courses = []
fs.readFile('data.json', 'utf8', (err, data) => {
    if (fs.existsSync('data.json')) {
        if (err) {
            console.log(err)
        }
        if (data.length > 0) {
            new_data = JSON.parse(data)
            for (item of new_data) {
                // console.log(item)
                courses.push(item)
            }
            console.log('courses ', courses)
        }
    }
});
app.get('/', (req, res) => {
    res.send('hello world')
});

// post request

app.post('/api/courses', (req, res) => {
    if (!req.body.name) return res.status(400).send('name is required ');
    let course = {}
    if (!courses.length) {
        course = {
            id: 1,
            name: req.body.name
        }
    }
    else if (courses.length) {
        course = {
            id: courses[courses.length - 1]["id"] + 1,
            name: req.body.name
        }
    };
    courses.push(course)
    console.log('finall all courses ', courses)
    let final_data = JSON.stringify(courses)
    fs.writeFile('data.json', final_data, err => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('updated successfully')
        }
    })
    res.setHeader('content-type', 'text/json')
    // res.send('Data is entered')
    res.send(course)
})

// get request

app.get('/api/courses', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, prm_data) => {
        if (err) {
            console.log(err)
        }
        console.log(prm_data)
        new_data = JSON.parse(prm_data)
        res.send(new_data)
    })
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('the course of this id not found');
    res.send(course)
})
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}..`))


// update request

app.put('/api/courses/:id', (req, res) => {
    // look at the course if not 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('the course of this id not found');
    const index = courses.indexOf(course);
    courses[index]["name"] = req.body.name

    let final_data = JSON.stringify(courses)
    fs.writeFile('data.json', final_data, err => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('updated successfully')
        }
    })
    res.setHeader('content-type', 'text/json')
    // res.send('Data is entered')
    res.send(course)
})

// delete request 
app.delete('/api/courses/:id', (req, res) => {
    let arr = []
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('the course of this id not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    let final_data = JSON.stringify(courses)
    fs.writeFile('data.json', final_data, err => {
        if (err) {
            console.log(err)
        }
        else {
            console.log('updated successfully')
        }
    })
    res.setHeader('content-type', 'text/json')
    res.send(course);
})