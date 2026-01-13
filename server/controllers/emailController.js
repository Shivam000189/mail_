// const router = require('../routes/emailRoutes'); controllers shouldn't import routes



const generateEmail =  (req, res) => {
    const { topic } = req.body;
    const generatedEmail = `This is a professional email about ${topic}`;
    return res.json({email : generatedEmail });
}


module.exports = { generateEmail };