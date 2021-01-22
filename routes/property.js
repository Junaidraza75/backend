const propertyController = require('../controllers/property');
const express = require('express');
const {body } = require('express-validator');
const router = express.Router();
let 
    multer = require('multer')
//      { v4: uuidv4 } = require('uuid');
// const {s3,BUCKET_NAME,multerS3} = require("../config/aws.js");
    
const DIR = "./public/propertyad/";

console.log(DIR);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, file.fieldname + '-' +  fileName)
    }
});

var upload = multer({
    storage: storage
    // fileFilter: (req, file, cb) => {
    //     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    //         cb(null, true);
    //     } else {
    //         cb(null, false);
    //         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    //     }
    // }
});




// var upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: BUCKET_NAME,
//       // Set public read permissions
//       acl: 'public-read',
//       // Auto detect contet type
//       metadata: (req, file, callBack) => {
//         callBack(null, { fieldName: file.fieldname })
//     },
//     key: (req, file, callBack) => {
//         var fullPath = 'product/' + file.originalname;//If you want to save into a folder concat de name of the folder to the path
//         callBack(null, fullPath)
//     }
//     })
//   })


router.get('/get',propertyController.getProduct);
// router.post('/getcsv',

// upload.array('photo', 15)

// ,propertyController.getProductcsv);




router.get('/getpagination/:limit',propertyController.getProductbylimit);
router.get('/getimg/:img',propertyController.getProductimg);
router.get('/get/:id',propertyController.getIdbyProduct);
router.post('/getarea',propertyController.getArea);

router.post('/getsearch',propertyController.getProductInfobySearch);

router.get('/getcategory/:id',propertyController.getIdbyCategory);
router.get('/getvendor/:id',propertyController.getIdbyVendor);
router.get('/getbrand/:id',propertyController.getIdbyBrand);
router.get('/getvendorinfo/:id',propertyController.getIdbyVendorInfo);
router.post('/editapproved/:id',propertyController.getIdbyApproved);
router.get('/:slug',propertyController.getSlugbyProduct);
router.post('/add'
,[
                        //  body('title').isLength({min:3}).withMessage('title must be 3 characters Long '),
                        //  body('description').not().isEmpty().withMessage('description is required '),
                        //  body('meta description').not().isEmpty().withMessage('meta description of birth is required '),
                        //  body('meta title').not().isEmpty().withMessage('meta title is required '),
                        //  body('image').not().isEmpty().withMessage('image is required '),
                        //  body('icon').not().isEmpty().withMessage('icon is required '),
                        //  body('status').not().isEmpty().withMessage('status is required '),
                        //  body('brand_id').not().isEmpty().withMessage('brand id No is required ')
                        //  //,
                        // body('image').not().isEm.isLength().withMessage('Title body must contain atleast 10 characters')pty().withMessage('Image is Required') 

                       ]
                       ,
                       upload.fields([{
                        name: 'photo', maxCount: 10
                      }, {
                        name: 'customer_photo', maxCount: 1
                      }])
                       ,
                       propertyController.addProduct);




                       

router.post('/edit/:id', 
             [
               //  body('title').isLength({min:3}).withMessage('title must be 3 characters Long '),
               //  body('description').not().isEmpty().withMessage('description is required '),
               //  body('meta description').not().isEmpty().withMessage('meta description of birth is required '),
               //  body('meta title').not().isEmpty().withMessage('meta title is required '),
               //  body('image').not().isEmpty().withMessage('image is required '),
               //  body('icon').not().isEmpty().withMessage('icon is required '),
               //  body('status').not().isEmpty().withMessage('status is required '),
              
               
             ] ,
             upload.fields([{
              name: 'photo', maxCount: 10
            }, {
              name: 'customer_photo', maxCount: 1
            }])
             ,               
             propertyController.editProduct);
router.delete('/delete/:id',propertyController.deleteProduct);
module.exports = router ;