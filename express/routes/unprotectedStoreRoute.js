const express = require('express')
// const requireAuth = require('../middleware/requireAuth');
const {
  getStore
} = require('../controllers/unprotectedStoreController');

const router = express.Router();

router.get('/:storePath', getStore)

module.exports = router;
