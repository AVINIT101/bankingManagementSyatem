const router = require('express').Router();
const loanController = require('../../Controller/Loan');
const UserController = require("../../Controller/User")

router.get('/:id',loanController.loanDetails);

router.post('/applyLoan',loanController.applyLoan);
router.post('/loanDetails',loanController.loanDetails);

//router.put('/UpdateLoanDetails/:id',loanController.updateLoandetails);


module.exports = {
  loanRouter: router,
};
