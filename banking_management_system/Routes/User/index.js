const router = require('express').Router();
const userController = require('../../Controller/User');

router.get('/:id',userController.getUserDetails);
router.post('/register',userController.register);
router.post('/login',userController.login);

router.put('/updateUser/:id',userController.updateUser);


module.exports = {
  userRouter: router,
};
