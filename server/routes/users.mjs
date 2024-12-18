import Users from '../models/users.mjs'
import express, { Router } from 'express'
import multer from 'multer'
import fs from 'node:fs'
import path from 'node:path'

// Setting the destination path for product photos
const root = path.resolve()
const destination = path.join(root, '/public/')


// Initializing multer diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.mimetype.split('/')[1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  },
})
const upload = multer({ storage })

const router = Router()



router.put("/:id", upload.single("picture"), async (req, res) => {
  //console.log('inside put');
    const { id } = req.params
    const {fullName, email} = req.body
    // Get the user to be updated
    const toBeUpdated = await Users.findById(id)
    if (!toBeUpdated) return res.send({ error: "No user found!" })
    
    if(Boolean(toBeUpdated.picture))  fs.unlinkSync(destination + toBeUpdated.picture)
    
    try {
        const newUser = { fullName, email, picture: req.file.filename }
        await Users.findByIdAndUpdate(id, newUser)

        return res.send({msg: 'User updated with success!'})
    } catch (error) {
        return res.send({error: error.message})
    }
    

})


router.use(express.json())

router.get('/', async (req, res) => {
  const { cursor } = req.query

  const query = {}
  if (cursor) {
    query._id = { $gt: cursor }
  }
  try {
    const allUsers = await Users.find(query, null, { limit: 5 })
    return res.send(allUsers)
  } catch (error) {
    return res.send({ error: error.message })
  }
})

router.get("/:id", async(req, res) => {
  const { id } = req.params
  
  try {
    const singleUser = await Users.findById(id)
    if (!singleUser) return res.send({ error: 'User not found' })
    
    return res.send(singleUser)
    
  } catch (error) {
    return res.send({error: error.message})
  }
})
router.patch("/notifUrl/:id", async(req,res)=> {
  const { id } = req.params
  //console.log(req.body)
  const { notifUrl } = req.body
    // Get the user to be updated
     const toBeUpdated = await Users.findById(id)
  if (!toBeUpdated) return res.send({ error: 'No user found!' })
   try {
     const newUser = {
       fullName: toBeUpdated.fullName,
       email: toBeUpdated.email,
       picture: toBeUpdated.picture,
       notifUrl,
     }
     //console.log(newUser)
     await Users.findByIdAndUpdate(id, newUser)
     return res.send({ msg: 'User updated with success!' })
   } catch (error) {
     return res.send({ error: error.message })
   }
    
})
router.patch("/:id", async (req, res) => {
     const { id } = req.params
     const { fullName, email } = req.body
     // Get the user to be updated
     const toBeUpdated = await Users.findById(id)
    if (!toBeUpdated) return res.send({ error: 'No user found!' })
    
    try {
      const newUser = { fullName, email, picture: toBeUpdated.picture}
      await Users.findByIdAndUpdate(id, newUser)

      return res.send({ msg: 'User updated with success!' })
    } catch (error) {
      return res.send({ error: error.message })
    }
    
})
export default router