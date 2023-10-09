const mongoose = require('mongoose');


const LoanSchema = mongoose.Schema({
    category:  { type: String,
            required: true,},
           
    borrower: { type: String,
        required: true,},  

    amount: { type: Number,
        required: true,}, 

    interestRate:  { type: Number },  

    term:  { type: Number },
                 
    startDate:  { type: Date},

    status:  { type: String },

    payments: { type: Array },
}, {
    timestamps: true
  });

  module.exports = mongoose.model('loan',LoanSchema);