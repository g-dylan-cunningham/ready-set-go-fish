const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const fs = require("fs");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" }); // expires in 3 days
};

const getAll = async (req, res) => {
  const users = await prisma.User.findMany({
    // select: {
    //   displayName
    // }
  });

  fs.writeFileSync(__dirname + "/../mocks/user.json", JSON.stringify(users));
  // console.log(fs.readFileSync(__dirname + "/../mocks/user.json", "utf8"));

  // TODO DONT EXPOSE PASSWORDS in the response
  res.json(users);
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      throw Error("email and password are required");
    }

    const user = await prisma.User.findFirst({ where: {email} });
    if (!user) {
      throw Error("Incorrect email"); // make same message as bad password
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect user credentials"); // make more generic?
    }

    const defaultMessage = "Please enter valid user credentials";

    // const exists = await prisma.User.findUnique({
    //   where: {
    //     email
    //   }
    //   });
    // if (!exists) {
    //   throw Error(defaultMessage);
    // }
    const token = createToken(user.id);
    res.json({ token, email });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, displayName, password, zip } = req.body;

    if (!email || !password) {
      throw Error("email and password are required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      throw Error("Password is not strong enough");
    }

    // is email unique?
    const exists = await prisma.User.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      throw Error("Email already in use");
    }

    // a 'salt' is a random string added to all passwords before encryption.
    // this prevents hackers from 'password matching'
    const salt = await bcrypt.genSalt(10); // default value is 10, more is more secure
    const hash = await bcrypt.hash(password, salt);
    const user = await prisma.User.create({
      data: {
        email,
        displayName: email,
        password: hash,
        zip,
      },
    });
    const token = createToken(user.id);
    const resp = {
      email,
      displayName,
      zip,
      token,
    };

    res.status(201).json(resp);
  } catch (error) {
    console.log({ error });
    res.status(400).json({ message: error.message });
  }
};


const deleteAll = async (req, res) => {
  const result = await prisma.User.deleteMany();
  res.json({ result });
};

module.exports = {
  getAll,
  signupUser,
  loginUser,
  deleteAll,
};
