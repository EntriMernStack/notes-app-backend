const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
require("dotenv").config();
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") ///Bearer euewekrjnnffmdksmfjdfld.jkshfjsif.fhsfdskf
  ) {
    try {
      //token
      token = req.headers.authorization.split(" ")[1]; //['Bearer','euewekrjnnffmdksmfjdfld.jkshfjsif.fhsfdskf']
      console.log(token);
      const decoded = jwt.verify(token, process.env.LOGIN_SECRET_KEY);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
});

module.exports = { protect };
