const prisma = require("../db/prisma");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const validator = require("validator");
const fs = require("fs");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d'}) // expires in 3 days
}


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
        email
      }
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
    const token = createToken(user._id)
    const resp = {
      email, displayName, zip, token
    }

    res.status(201).json(resp);
  } catch (error) {
    console.log({error})
    res.status(400).json({ message: error.message });
  }
};

// const signupUser = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.signup(email, password);
//     console.log('user', user)
//     const token = createToken(user._id)
//     console.log('token', token)
//     res.json({ token, email });
//   } catch (error) {
//     res.status(400).json({
//       error: error.message
//     })
//   }
// };

const deleteAll = async (req, res) => {
  const result = await prisma.User.deleteMany();
  res.json({ result });
};

module.exports = {
  getAll,
  signupUser,
  deleteAll,
};
