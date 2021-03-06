import express from "express";
import expressAsynHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAuth } from "../utils.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsynHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

// Signin
userRouter.post(
  "/signin",
  expressAsynHandler(async (req, res) => {
    // find user email in the database
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // compare password entered with the hashed password in database
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          // isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// Register
userRouter.post(
  "/register",
  expressAsynHandler(async (req, res) => {
    // create new user by passing an instance of User object
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      isSeller: createdUser.isSeller,
      token: generateToken(createdUser),
    });
  })
);

// get user profile
userRouter.get(
  "/:id",
  expressAsynHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  })
);

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // fetch user from database
    const user = await User.findById(req.user._id);
    if (user) {
      // use name entered or use the name stored in the database
      user.name = req.body.name || user.name;
      // use email entered or use the email stored in the database
      user.email = req.body.email || user.email;
      // if new password has been entered, encrypt the password before saving
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      // save update
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

export default userRouter;
