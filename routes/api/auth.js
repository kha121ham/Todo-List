const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../model/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route    GET  api/auth
//desc      get user info
//access    private
router.get("/", auth, async (req, res) => {
  //Get all user data by ID from database
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
  
  //@rout    Post api/auth
  //@desc    authenticate user & get token
  //@access   Public
  router.post(
    "/",
    [
      check("email", "Please include a valid email").isEmail(),
      check("password","Password is required").exists(),
    ],
    async (req, res) => {
      //check errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        let user = await User.findOne({ email });
        //See if user not exist
        if (!user) {
          return res.status(400).json({  msg:'Invalid email or password' });
        }
  
       //compare between password user enter and password user in database
      const isMatch =await bcrypt.compare(password,user.password);
      if(!isMatch){
        return res.status(400).json({ msg:'Invalid email or password'});
      }
        //Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.get("jwtSecret"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );


  module.exports = router;