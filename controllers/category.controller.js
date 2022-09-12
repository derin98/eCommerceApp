

const db = require('../models');
const Category = db.category;


exports.create = (req, res) => {
  
    const category = {
        name: req.body.name,
        description: req.body.description
    }

 
    Category.create(category).then(response => {
        console.log(`category: [${response} got inserted in db]`);
        res.status(201).send(response);
    }).catch(err => {
        console.log(`category: [${err} not inserted in db]`);
        res.status(500).send({
            message: "Some internal error occurred while storing the category data!"
        })
    })
}


exports.update = (req, res) => {
   
    const category = {
        name: req.body.name,
        description: req.body.description
    }
    const categoryId = req.params.id;
    Category.update(category, {
        where: { id: categoryId }
    }).then(response => {
        console.log(category, categoryId);
        res.status(200).send(response);

    }).catch(err => {
        res.status(500).send({
            message: "Some internal error occurred while updating the category data!"
        });
    });
};

exports.delete = (req, res) => {
    const categoryId = req.params.id;
    Category.destroy({
        where: {
            id: categoryId
        }
    }).then(response => {
        res.sendStatus(200).send(response);

    }).catch(err => {
        res.sendStatus(500).send({
            message: "Some internal error occurred while deleting the category!"
        })
    });
}


exports.findOne = (req, res) => {
    const categoryId = req.params.id;
    Category.findByPk(categoryId).then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message: "Some internal error occurred while fetching category based upon category id!"
        })
    })
}

exports.findAll = (req, res) => {
    let categoryName = req.query.name;
    let promise;
    if (categoryName) {
        promise = Category.findAll({
            where: {
                name: categoryName
            }
        })
    }
    else {
        promise = Category.findAll();
    }

    promise.then(response => {
        res.status(200).send(response);
    }).catch(err => {
        res.status(500).send({
            message: "Some internal error occurred while fetching all the categories"
        })
    })
}