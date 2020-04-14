const { Router } = require('express');
const Controller = require('../controllers/productController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const productRouter = Router();
productRouter.use(authentication);
productRouter.get('/', Controller.showProducts);
productRouter.post('/', authorization, Controller.addProduct);
productRouter.put('/:id', authorization, Controller.editProduct);
productRouter.delete('/:id', authorization, Controller.deleteProduct);
module.exports = productRouter;