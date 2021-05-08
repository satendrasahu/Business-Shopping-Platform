const express = require('express');
const { requireSignin, adminMiddleware } = require('../common.middleware');
const { createProduct, getProductsBySlug, getProductDetailsById, deleteProductById, getProducts } = require('../controller/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});


const upload = multer({ storage });
router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/products/:slug', getProductsBySlug);
router.get("/product/:productId", getProductDetailsById);
router.delete(
    "/product/deleteProductById",
    requireSignin,
    adminMiddleware,
    deleteProductById
);
router.post(
    "/product/getProducts",
    requireSignin,
    adminMiddleware,
    getProducts
);
module.exports = router;








































// const express = require('express');
// const { requireSignin, adminMiddleware } = require('../common.middleware');
// const { createProduct, getProductBySlug } = require('../controller/product');
// const multer = require('multer');
// const router = express.Router();
// const shortid = require('shortid')
// const path = require('path');
// const Product = require('../models/product');

// //const upload = multer({ storage });

// const storage = multer.diskStorage({
//     // destination: './upload/images',
//     destination: function (req, file, cb) {
//         cb(null, path.join(path.dirname(__dirname), "uploads"));
//     },
//     // filename: (req, file, cb) => {
//     //     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     // }
//     filename: function (req, file, cb) {
//         cb(null, shortid.generate() + "-" + file.originalname);
//     },
// });


// const upload = multer({ storage });

// //router.use('/profile', express.static('upload/images'));
// router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
// router.get('/products/:slug', getProductBySlug);
// module.exports = router;
















