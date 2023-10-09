const bcrypt = require('bcrypt'); // Import bcrypt
const userModel = require('../../Model/User');
const { generateToken, verifyToken, hashPassword, comparePassword, authenticate } = require("../../authentication");




// Create and Save a new User
const register = async (req, res) => {
        // Check if the username already exists
        const userName = req.body.userName;
        const password = req.body.password;

        const existingUser = await userModel.findOne({ userName });

        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
        // Hash the password before storing it
        const saltRounds = 10; // Number of salt rounds (adjust as needed)
        console.log(password,saltRounds)
        const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new userModel({
        name: req.body.name,

        dob: req.body.dob,

        country: req.body.country,

        state: req.body.state,

        pan: req.body.pan,

        accountType:req.body.accountType,

        address:req.body.address,

        email:req.body.email,

        mobile:req.body.mobile,

        userName:req.body.userName,

        password:hashedPassword
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

const updateUser = (req, res) => {

    const token = req.header('token'); // Get the JWT token from the header
    const decodedToken = verifyToken(token);
    const authenticateToken = authenticate(token,req.params.id)

    if (!decodedToken || !authenticateToken) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Find user and update it with the request body
    userModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Untitled User",
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};
const login = async (req, res) => {
    try {
      const { userName, password } = req.body;
  
      // Find the user by username
      const user = await userModel.findOne({ userName }); 
  
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Compare the entered password with the hashed password in the database
      const passwordMatch = await comparePassword(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      // Generate a JWT token upon successful login
      const token = generateToken(user);
  
      res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  const getUserDetails = async (req, res) => {
    try {
      const  id  = req.params.id;

      const user = await userModel.findOne({ _id: id }); 
      if (!user) {
        return res.status(401).json({ message: 'User not Found' });
      }
  
  
      res.status(200).json({ message: 'User found', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = {
    register,
    updateUser,
    login,
    getUserDetails,
};