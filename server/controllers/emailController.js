// const router = require('../routes/emailRoutes'); controllers shouldn't import routes



const generateEmail =  (req, res) => {
    const { topic } = req.body;
    console.log(topic);
    return res.json({msg:"Controller working"});
}


module.exports = { generateEmail };