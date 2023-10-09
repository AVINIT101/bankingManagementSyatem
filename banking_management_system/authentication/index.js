// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Your secret key for JWT
const secretKey = 'jcslkmcmmcmLMC\ZMCKMCSC'; // Replace with a strong, random key

// Function to generate a JWT token
function generateToken(user) {
  const payload = {
    userid: user.id,
  };
  console.log(user.id)
  const options = {
    expiresIn: '1h', // Token expiration time (adjust as needed)
  };

  return jwt.sign(payload, secretKey, options);
}

// Function to verify a JWT token
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; // Token is invalid or expired
  }
}
 function authenticate(token,userid) {
  
    try {
      const decodedToken = jwt.verify(token, secretKey);
      const userIdFromToken = decodedToken.userid
        console.log(userid)
        console.log(userIdFromToken)


      if (userIdFromToken!==userid) {
        console.log()
        return false
      }
  
    } catch (error) {
      return false
    }
    return true
  }


// Function to hash a password
async function hashPassword(plainPassword) {
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
}

// Function to compare a password with its hash
async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  authenticate,
};
