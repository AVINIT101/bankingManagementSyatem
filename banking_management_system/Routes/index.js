const router = require('express').Router();

const { userRouter } = require('./User');
const { loanRouter} = require("../Routes/Loan")

router.use('/User', userRouter);
router.use('/loan',loanRouter)
module.exports = router;
