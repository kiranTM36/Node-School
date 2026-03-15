const express = require('express')
const studentModel = require('./../models/studentModels');
const { generateToken,jwtAuthMiddleware } = require('../jwt');

const router = express.Router()

router.get('/' ,jwtAuthMiddleware, async (req, res) => {

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

     const payload = {
        id : reponse.id,
        name : response.name
     }
     const token = generateToken(response.payload)
     console.log("Token : "+ token)
     res.status(200).json({response : response, token : token})

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
              console.log("Data Removed")
              res.status(200).json(response)
      
          } catch (error) {
              console.log("Error " + error)
              res.status(500).send('Something went Wrong')
          }
       })

       router.post('/login', async (req, res) => {
        try {
            const {name, password} = req.body

        const user = await studentModel.findOne({name : name})

        const isMatchPwd = await user.password === password

        if(!user || !isMatchPwd )
        {
            console.log("User NOT Found")
        return res.status(401).send("User NOT Found")
        }

        const payload = {
            id : user.id,
            name : user.name
        }
        const token = generateToken(payload)
        
        return json(token)
        } catch (error) {
            return res.status(500).json({error:  "Error"})
        }
       })
      
module.exports = router
