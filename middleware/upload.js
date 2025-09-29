const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Upload = path.join(__dirname, '../Upload')
if(!fs.existsSync(Upload)){fs.mkdirSync(Upload)};

const photo_filter = (req, file, cb) => {
    const allowed_format = ['image/jpeg', 'image/png', 'application/pdf'];
    if(!allowed_format.includes(file.mimetype)){
        return cb(new Error('Only JPG, PNG, and PDF files are allowed'), false);
    }
    cb(null, true);
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        return cb(null, Upload);
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const photo = multer({
    storage,
    fileFilter: photo_filter,
    limits: {
        fileSize: 50 * 1024
    }
});

module.exports = photo;