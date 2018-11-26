const express = require('express')
const router = express.Router()
const multer = require('multer')

const Beer = require('../models/beer')
const mongoose = require('mongoose')

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: function(req, files, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    },
    fileFilter: fileFilter
})



const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}})


router.get('/beer', (req, res) => {
    Beer
        .find()
        .exec()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: err})
        })
})

router.post('/beer', upload.single('labelImage'), async (req, res, next) => {
    console.log(`req body: ${req.file}`)

    const { 
        title, 
        style, 
        description, 
        abv, 
        birthday, 
    } = req.body

    const beer = new Beer({
        _id: mongoose.Types.ObjectId(),
        title, 
        style,
        description,
        abv,
        birthday, 
        labelImage: req.file.path
    })

    try {
        await beer.save()
        res.send(beer)
    } catch (err) {
        console.log(err)
        res.send(500, err)
    }

    
})

router.delete('/:beerId', (req, res, next) => {
    const id = req.params.beerId
    Beer
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router