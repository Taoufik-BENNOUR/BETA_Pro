const express = require("express");
const {addProduct,deleteProduct,getProductById,getAllProducts,updateProduct,} = require("../controllers/product.controller");
const isAuth = require("../middlewares/passport-setup");
const multer = require("multer")
const path = require("path");
const { productRules,validator } = require("../middlewares/validator");



const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'./client/public/images/')

    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+path.extname(file.originalname))
      console.log(req.file)

    }

  })
  let upload = multer({storage}).single("photo")

// const fileFilter=(req,file,cb)=>{
//   const allowedFileTypes = ['image/jpeg','image/jpg','image/png'];
//   if(allowedFileTypes.includes(file.mimetype)){
//     cb(null,true);}
//     else{

//       cb(null,false)
//     }
  
// }

const Router = express.Router();

//  http://localhost:8000/product/addProduct
// add product


Router.post("/addProduct", isAuth(),upload,addProduct);

//  http://localhost:8000/product/updateProduct/:idProduct
// update Product
Router.put("/updateProduct/:idProduct", isAuth(), updateProduct);

//  http://localhost:8000/product/deleteProduct/:idProduct
// delete Product

Router.delete("/deleteProduct/:idProduct", isAuth(), deleteProduct);

//  http://localhost:8000/product/products
//getAllProducts
Router.get("/products", getAllProducts);

//  http://localhost:8000/product/:id
// get Product by id

Router.get("/:productId",getProductById);

module.exports = Router;