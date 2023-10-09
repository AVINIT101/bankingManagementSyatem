const loanService = require("../../Service/Loan");

const applyLoan = async (req, res, next) => {
    try {
      const response = await loanService.applyLoan(req,res);
      return res.status(200)
    } catch (err) {
      return next(err);
    }
  };
  const loanDetails = async (req, res, next) => {
    try {
      const response = await loanService.loanDetails(req,res);
      return res.status(200)
    } catch (err) {
      return next(err);
    }
  };
  const updateloanDetails = async (req, res, next) => {
    try {
      const response = await loanService.updateloanDetails(req,res);
      return res.status(200)
    } catch (err) {
      return next(err);
    }
  };
  
  module.exports = {
    applyLoan,
    loanDetails,
    updateloanDetails,
  };
  