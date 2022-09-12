
const categoryController = require('../controllers/category.controller');
const { requestValidator, authJwt } = require('../middlewares');
module.exports = function (app) {

    app.post("/ecomm/api/v1/categories", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], categoryController.create)


    app.put("/ecomm/api/v1/categories/:id", [requestValidator.validateCategoryRequest, authJwt.verifyToken, authJwt.isAdmin], categoryController.update)

  
    app.delete("/ecomm/api/v1/categories/:id", [authJwt.verifyToken, authJwt.isAdmin], categoryController.delete)

   
    app.get("/ecomm/api/v1/categories/:id", categoryController.findOne)


    app.get("/ecomm/api/v1/categories", categoryController.findAll)
}