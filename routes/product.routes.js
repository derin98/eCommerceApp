
const productController = require('../controllers/product.controller');
const { requestValidator, authJwt } = require('../middlewares');
module.exports = function (app) {
    
    app.post("/ecomm/api/v1/products", [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.create)

   
    app.put("/ecomm/api/v1/products/:id", [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin], productController.update)

   
    app.delete("/ecomm/api/v1/products/:id", [authJwt.verifyToken, authJwt.isAdmin], productController.delete)

 
    app.get("/ecomm/api/v1/products/:id", productController.findOne)

    
    app.get("/ecomm/api/v1/products", productController.findAll)

    
    app.get("/ecomm/api/v1/categories/:categoryId/products", [requestValidator.validateCategoryInRequestParams], productController.getProductsUnderCategory)

}