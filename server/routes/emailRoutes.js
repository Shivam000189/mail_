const express = require('express');
const router = express.Router();
const { generateEmail } = require('../controllers/emailController');


// router.use(express.json()); not use in the router use in the index.js

router.post('/generate-email', generateEmail)


module.exports = router;
