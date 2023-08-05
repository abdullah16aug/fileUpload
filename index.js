const express = require('express')
const cors=require('cors')
const multer = require('multer')
const sharp = require("sharp");

const port=8080
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.send('hello world')
})

// const resizeImages = async (req, res, next) => {
//     console.log('resizeIMage')
//     if (!req.file) return next();
  
//     req.body.images = [];
//     await Promise.all(
//       req.files.map(async file => {
//         const newFilename = 'RESIZE'+file.filename;
  
//         await sharp(file.buffer)
//           .resize(640, 320)
//           .toFormat("png")
//           .jpeg({ quality: 10 })
//           .toFile(`upload/${newFilename}`);
  
//         req.body.images.push(newFilename);
//       })
//     );
  
//     next();
//   };

const resizeImages = async (req, res, next) => {
  console.log('resizeIMage');
  if (!req.file) return next();

  const newFilename = 'RESIZE-' + req.file.filename;

  await sharp(req.file.buffer)
    .resize(640, 320)
    .toFormat('jpeg')
    .jpeg({ quality: 10 }) // Note: This won't have any effect as we are converting to PNG format, not JPEG.
    .toFile(`upload/${newFilename}`);

  req.body.images = [newFilename];
  
  next();
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


  const upload = multer({ storage: storage})  


app.post('/upload',resizeImages,upload.single('myFile'),async(req,res)=>{
    try {
        console.log(req.body)
        console.log(req.file)
res.status(201).json({message:'You have reached the upload route'})
        
    } catch (error) {
        res.status(501).json({error:'You have reached the error route'})

    }
})
app.listen(port,(req,res)=>{
console.log(`app is listening on port ${port}`)
})