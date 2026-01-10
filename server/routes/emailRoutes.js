const express = require('express');
const router = express.Router();

// router.use(express.json()); not use in the router use in the index.js

router.post('/generate-email', (req, res) => {
    const topic = req.body();
    
    return res.json({msg: "take the topic"})
})


module.exports = router;
