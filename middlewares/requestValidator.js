const { category } = require("../models");

const validateCategoryRequest = (req, res, next) =>{
 
     if(!req.body.name){
         res.status(400).send({
             message: "Name of the category can't be empty"
         })
         return;
     }
     next();
}

const validateProductRequest = (req, res, next) =>{
 
    if(!req.body.name || !req.body.price){
        res.status(400).send({
            message: "Name or price of the product can't be empty"
        })
        return;
    }
    else{
        if(req.body.categoryId){
            category.findByPk(req.body.categoryId).then(response =>{
                if(!response){
                    console.log("*****we are here in request validator for product for create****",req.body);
                    res.status(400).send({
                        message: `CategoryId passed is not valid : ${req.body.categoryId}`
                    })
                    return;
                }
                else{
                    if(!req.body.price || req.body.price <= 0){
                        res.status(400).send({
                            message: "Price doesn't seems to be in place!"
                        })
                        return;
                    }else{
                        next();
                    }
                }
            })
        }else{
            res.status(400).send({
                message: "CategoryId of a product is not available!"
            })
            return;
        } 
    }

      
    
}

const validateCategoryInRequestParams=(req, res, next) => {
    const categoryId = req.params.categoryId;

    if(categoryId){ 
        category.findByPk(categoryId).then(response =>{
            if(!response){ 
                res.status(400).send({
                    message: `CategoryId passed is not valid : ${categoryId}`
                })
                return;
            }
            else{ 
                next();
            }     
        }).catch(err => {
            res.status(500).send({
                message: 'Some inernal error occurred'
            })
        })
    }else{
        res.status(400).send({
            message: `CategoryId is not available`
        })
        return;
    }

}

module.exports = {validateCategoryRequest, validateProductRequest, validateCategoryInRequestParams};
