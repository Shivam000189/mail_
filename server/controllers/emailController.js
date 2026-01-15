// const router = require('../routes/emailRoutes'); controllers shouldn't import routes
const OpenAI = require("openai");
const { Messages } = require("openai/resources/chat/completions.js");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const generateEmail = async (req, res) => {

    try{
        const {topic, tone} = req.body;

        const prompt = `Write a ${tone} Professional about the following topic:
        
        topic : ${topic}
        `;

        const response = await openai.chat.completions.create({
            model:"gpt-4o-mini",
            messages:[
                {role:"user", content:prompt}
            ],
        });

        const email = response.choices[0].message.content;

        res.json({
            email
        });
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Email generation failed" })
    }

//     const { topic, tone} = req.body;
//     const generatedEmail = `This is a ${tone.toLowerCase()} email about ${topic}`;
//     return res.json({
//   email: generatedEmail
// });
}


module.exports = { generateEmail };