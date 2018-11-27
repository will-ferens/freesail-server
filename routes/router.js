const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = require('../upload/upload')

const Beer = require('../models/beer')
const mongoose = require('mongoose')


const singleUpload = upload.single('labelImage')

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

router.post('/beer', async (req, res, next) => {
    singleUpload(req, res, async function(err, some) {
        if (err) {
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] })
        }

        // return res.json({'imageUrl': req.file.location})
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
            labelImage: req.file.location
        })
    
        try {
            await beer.save()
            res.send(beer)
        } catch (err) {
            console.log(err)
            res.send(500, err)
        }
    })

    
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