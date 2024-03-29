const express = require('express')
const requireAuth = require('../middleware/requireAuth');
const {
  getAll,
  createNew,
  deleteAll,
  getMyStores,
  updateStore,
} = require('../controllers/storeController');

const router = express.Router();
router.use(requireAuth);

router.get('/all', getAll)
router.get('/myStores', getMyStores)
router.post('/create', createNew)
router.delete('/all', deleteAll)
router.put('/', updateStore)

module.exports = router;
