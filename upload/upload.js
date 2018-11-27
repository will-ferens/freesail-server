const aws = require('aws-sdk')
const multer = require('multer')
const multers3 = require('multer-s3')
require('dotenv').config()


aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})

const s3 = new aws.S3({})

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.BUCKET_NAME,

        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload