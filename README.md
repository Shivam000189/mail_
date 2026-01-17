✉️ AI-Powered Email Generator

A full-stack web application that generates professional emails using AI based on a user-provided topic and tone.
Users can copy generated emails and save templates for future use.

This project uses React on the frontend and Node.js + Express on the backend, with OpenRouter (GPT models) for AI generation.

🚀 Features

🧠 AI-generated professional emails

🎭 Tone selection (Professional, Formal, Friendly)

📋 Copy email to clipboard

💾 Save email templates (persistent using localStorage)

🔐 Secure API key handling (backend only)

⚡ Clean REST API architecture

🛠 Tech Stack
Frontend

React (Vite)

JavaScript

CSS / Tailwind (optional)

Backend

Node.js

Express.js

OpenRouter SDK

dotenv

CORS

AI

OpenRouter

GPT-4.1-mini (OpenAI)

📁 Project Structure
ai-email-generator/
│
├── backend/
│   ├── controllers/
│   │   └── emailController.js
│   ├── routes/
│   │   └── emailRoutes.js
│   ├── index.js
│   ├── package.json
│   └── .env   (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md

⚙️ Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)

npm

OpenRouter API key

🔐 Environment Variables Setup
1️⃣ Create .env file in backend/
backend/.env


Add your API key:

OPENAI_API_KEY=your_openrouter_api_key_here


⚠️ Never expose this key in frontend
⚠️ Do not commit .env to GitHub

🖥 Backend Setup (Local)
1️⃣ Go to backend folder
cd backend

2️⃣ Install dependencies
npm install

3️⃣ Start backend server
node index.js


Backend runs on:

http://localhost:5000

🎨 Frontend Setup (Local)
1️⃣ Go to frontend folder
cd frontend

2️⃣ Install dependencies
npm install

3️⃣ Start frontend
npm run dev


Frontend runs on:

http://localhost:5173

🔗 API Endpoint
Generate Email

POST /api/generate-email

Request Body

{
  "topic": "Sick leave request",
  "tone": "Professional"
}


Response

{
  "email": "Generated professional email text..."
}

🤖 AI Implementation

The backend securely calls OpenRouter using GPT models.

const response = await openRouter.chat.send({
  model: "openai/gpt-4.1-mini",
  messages: [{ role: "user", content: prompt }],
  maxTokens: 500,
});


Prompt includes:

Topic

Selected tone

💡 Key Learning Outcomes

Full-stack architecture (React + Express)

Secure API key management

AI prompt engineering

REST API design

Browser APIs (Clipboard)

Persistent storage using localStorage

Separation of concerns (routes, controllers)

📈 Future Improvements

User authentication

Database storage (MongoDB / PostgreSQL)

Template reuse button

PDF export

Deployment (Render + Netlify)

Rate limiting & API protection

👨‍💻 Author

Shivam Sharma
B.Tech | Full-Stack Developer

⭐ Support

If you like this project, give it a ⭐ on GitHub!