const loanModel = require("../../Model/Loan");
const userModel = require("../../Model/User");
const logger = require('../../log'); 



const { authenticate, verifyToken } = require("../../authentication");

const applyLoan = async (req, res) => {
const token = req.header('token'); // Get the JWT token from the header

const authenticateToken = authenticate(token,req.body.borrower)
const decodedToken = verifyToken(token);
if (!decodedToken || !authenticateToken) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

const loan = new loanModel({
          // Unique identifier for the loan
  borrower: req.body.borrower,
  amount: req.body.amount,            
  interestRate: req.body.interestRate,       
  term: req.body.term,               
  startDate: req.body.startDate, 
  status: req.body.status,      
  payments: [],
  category: req.body.category,

    
});

// Save User in the database
loan.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
    });
});
};
const loanDetails = async (req, res) => {
    try {
      const  id  = req.params.id;
  
    
      const loan = await loanModel.findOne({ _id: id }); 
  
      if (!loan) {
        return res.status(401).json({ message: 'Loan Details not Found' });
      }
  
      logger.http(`${req.method} ${req.url}`);
      res.status(200).json({ message: 'Loan Details', loan });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports =
{
    applyLoan,
    loanDetails,
}