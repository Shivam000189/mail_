// // const router = require('../routes/emailRoutes'); controllers shouldn't import routes
// const OpenAI = require("openai");
// const { Messages } = require("openai/resources/chat/completions.js");


// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });


// const generateEmail = async (req, res) => {

//     try{
//         const {topic, tone} = req.body;

//         const prompt = `Write a ${tone} Professional about the following topic:
        
//         topic : ${topic}
//         `;

//         const response = await openai.chat.completions.create({
//             model:"gpt-4o-mini",
//             messages:[
//                 {role:"user", content:prompt}
//             ],
//         });

//         const email = response.choices[0].message.content;

//         res.json({
//             email
//         });
//     }catch(error){
//         console.error(error);
//         res.status(500).json({error: "Email generation failed" })
//     }

// //     const { topic, tone} = req.body;
// //     const generatedEmail = `This is a ${tone.toLowerCase()} email about ${topic}`;
// //     return res.json({
// //   email: generatedEmail
// // });
// }


// module.exports = { generateEmail };



const { OpenRouter } = require("@openrouter/sdk");
require("dotenv").config();

// OpenRouter client
const openRouter = new OpenRouter({
  apiKey: process.env.OPENAI_API_KEY, 
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5000", 
    "X-Title": "Email",             
  },
});

const generateEmail = async (req, res) => {
  try {
    const { topic, tone } = req.body;

    const prompt = `Write a ${tone} professional email about the following topic:

    topic: ${topic}
    `;

    // callapi openROute
    const response = await openRouter.chat.send({
      model: "openai/gpt-4.1-mini", 
      messages: [
        { role: "user", content: prompt }
      ],
      stream: false,
      maxTokens: 500,
    });

    const email = response.choices[0].message.content;

    res.json({ email });
  } catch (error) {
    console.error(error);
    console.error("OpenRouter error:", error.response?.data || error.message);
    res.status(500).json({ error: "Email generation failed" });
  }
};

module.exports = { generateEmail };