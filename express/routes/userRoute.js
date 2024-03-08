const express = require('express')
// const prisma = require('../db/prisma');
const router = express.Router();
// const fs = require('fs');
const {
  getAll,
  signupUser,
  deleteAll
} = require('../controllers/userController');


router.get('/all', getAll);
router.post('/', signupUser);
router.delete('/all', deleteAll);

module.exports = router;
