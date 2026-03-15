const express = require('express');
const teacherModel = require('./../models/teacherModels');

const router = express.Router();

// CREATE teacher
router.post('/', async (req, res) => {
    try {
        const newTeacher = new teacherModel(req.body);
        const response = await newTeacher.save();

        console.log("Data saved");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error " + error);
        res.status(500).send('Something went wrong');
    }
});

// GET all teachers
router.get('/', async (req, res) => {
    try {
        const response = await teacherModel.find();
        console.log("Data fetched");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error " + error);
        res.status(500).send('Something went wrong');
    }
});

// UPDATE teacher
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await teacherModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!response) {
            console.log("No user found");
            return res.status(404).send("User not found!");
        }

        console.log("Data updated");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error " + error);
        res.status(500).send('Something went wrong');
    }
});

// DELETE teacher
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await teacherModel.findByIdAndDelete(id);

        if (!response) {
            console.log("No user found");
            return res.status(404).send("User not found!");
        }

        console.log("Data removed");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error " + error);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;