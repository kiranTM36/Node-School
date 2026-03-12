const express = require('express')
const teacherModel = require('./../models/teacherModels')

const router = express.Router()

router.post('/', async(res, req) => {
    try {
        const data = req.body
        const newteacher = new teacherModel(data)
        const response = await newteacher.save()

        console.log("Data Saved")
        res.status(200).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Something went Wrong')
    }
 })

 router.get('/', async(req, res) => {
    try {
        const response = await teacherModel.find()

    consloe.log("Data Fetched")
    res.status(200).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Something went Wrong')
    }
 })

 router.put('/teacher/:id',async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const response = await teacherModel.findByIdAndUpdate(id, data, {
            new : true,
             runValidators : true
        })

        if(!response){
            console.log("No user Found")
            res.send("User not found!")
        }

        console.log("Data Update")
        res.status(200).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Something went Wrong')
    }
 })

 router.delete('/teacher:id', async (req, res) => {
    try {
        
        const id = req.params.id
        const response = await teacherModel.findByIdAndUpdate(id)
        if(!response){
                    console.log("No user Found")
                    res.send("User not found!")
        
        }
        consloe.log("Data Removed")
        res.status(200).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Something went Wrong')
    }
 })

module.exports = router