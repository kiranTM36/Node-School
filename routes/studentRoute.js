const express = require('express')
const studentModel = require('./../models/studentModels')

const router = express.Router()

router.get('/' , async (req, res) => {

    try {
        const response = await studentModel.find();
        console.log('Data Fetch')
        res.status(200).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Something went Wrong')
    }

})

router.post('/', async (req, res) => {

    try {

     const data = req.body
     const newStudent = new studentModel(data)
     const response = await newStudent.save()

     console.log("Data saved.")
     res.status(200).json(response)

    } catch (error) {
        console.log("Error " + error)
        res.status(500).send('Something went Wrong')
    }
})

router.put('/student/:id', async(req, res) => {
     try {
             const id = req.params.id
             const data = req.body
             const response = await studentModel.findByIdAndUpdate(id, data, {
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

      router.delete('/student/:id', async (req, res) => {
          try {
              
              const id = req.params.id
              const response = await studentModel.findByIdAndUpdate(id)
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
