var express = require('express');
var router = express.Router();
const destinationsCtrl = require('../controllers/destinations')


// POST /destination
router.post('/flights/:id/destinations', destinationsCtrl.create)
router.delete('/destinations/:flight/:dest', destinationsCtrl.delete)


module.exports = router;
