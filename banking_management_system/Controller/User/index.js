const userService = require('../../Service/User');

const register = async (req, res, next) => {
  try {
    const response = await userService.register(req,res);
    return res.status(200);
  } catch (err) {
    return next(err);
  }
};
const getUserDetails = async (req, res, next) => {
  try {
    const response = await userService.getUserDetails(req,res);
    return res.status(200);
  } catch (err) {
    return next(err);
  }
};
const updateUser = async (req, res, next) => {
  try {
    const response = await userService.updateUser(req,res);
    return res.status(200)
  } catch (err) {
    return next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const response = await userService.login(req,res);
    return res.status(200)
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  register,
  login,
  getUserDetails,
  updateUser
};
