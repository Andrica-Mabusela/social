require("dotenv").config();
const bcrypt = require("bcryptjs");
const sequelizeConnection = require("../config/db.config");
const jwt = require("jsonwebtoken");

// THE EXPIRATION DURATION OF THE TOKEN
const maxAge = 2 * 24 * 60 * 60 * 1000;

// CREATE AUTH ACCESS TOKEN FROM USER ID
const createToken = (id) =>
  jwt.sign({ id }, process.env.AUTH_ACCESS_SECRET, { expiresIn: maxAge });

// GET THE USER MODEL
const User = require("../Models/User.model");

module.exports.authController = {
  // REGISTER AUTH CONTROLLER
  register: async (req, res) => {
    try {
      // CHECK IF THERE IS AN INPUT ERROR, ELSE CONTINUE WITH THE CONDE BLOCK
      if (req.authErrMessage) throw new Error(req.authErrMessage);

      // CONNECT TO THE DATABASE
      await sequelizeConnection.authenticate();

      // SYNC THE USER MODEL TO THE USERS TABLE
      User.sync({ alter: true });

      // HASH THE USER PASSWORD
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(
        req.authenticatedUser.password,
        salt
      );
      req.authenticatedUser.password = hashedPassword;

      // SAVE THE USER IN THE DATABASE
      const newUser = await User.create(req.authenticatedUser);
      console.log("new user", newUser.dataValues);

      const token = createToken(newUser.dataValues.user_id);
      res.cookie("token", token, { httpOnly: true, sameSite: true, maxAge });

      res.status(200).json({ error: null, success: true, user: newUser.dataValues, token });
      
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message, success: false, user: null });
    }
  },

  // LOGIN AUTH CONTROLLER
  login: async (req, res) => {
    try {
      // CHECK IF THERE IS AN INPUT ERROR, OTHERWISE CONTINUE
      if (req.authErrMessage) throw new Error(req.authErrMessage);

      // CONNECT TO THE DATABASE
      await sequelizeConnection.authenticate();

      // SYNC THE MODEL TO THE TABLE
      User.sync({ alter: true });

      // CHECK IF PHONE NUMBER IS REGISTERED
      const findEmailQuery = await User.findAll({
        where: { email: req.body.email },
        limit: 1,
      });

      if (findEmailQuery.length == 0)
        throw new Error("Email Address Is Not Registered");

      const user = findEmailQuery[0];

      console.log("user password:", user.password);
      console.log("entered password:", req.body.password);

      const isMatch = await bcrypt.compare(req.body.password, user.password);

      console.log("is Match:", isMatch);

      // IF THE PASSWORDS DO NOT MATCH, THROW ERROR, ELSE CONTINUE
      if (!isMatch) throw new Error("Wrong Email Address/password combination");

      // CREATE TOKEN
      const token = createToken(user.user_id);

      // CREATE COOKIE
      res.cookie("token", token, { httpOnly: true, sameSite: true, maxAge });

      res.status(200).json({ error: null, success: true, user, token });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message, success: false, user: null });
    }
  },


  // FORGOT PASSWORD AUTH CONTROLLER
  forgotPassword: async (req, res) => {
    // const [results, metadata] = await sequelizeConnection.query(
    //     "SELECT * FROM Invoices JOIN Users ON Invoices.userId = Users.id"
    //   );

    const courses = await sequelizeConnection.query("SELECT * FROM course");

    console.log("sesesees : ", courses);

    res.json(courses);
  },
};
