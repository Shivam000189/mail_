// import {useEffect, useState } from 'react'

// import './App.css'

// function App() {
//   const [topic, setTopic] = useState("");
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [tone , setTone] = useState("Professional");
//   const [templates, setTemplates] = useState([]);
  

//   const handleGenerate = async () => {
//       if(!topic) return;

//       setLoading(true);


//       const response =  await fetch("http://localhost:5000/api/generate-email", {
//         method:"POST",
//         headers:{
//           'content-Type' : 'application/json'
//         },
//         body : JSON.stringify({ topic, tone })
//       });
//       const data = await response.json();
//       setEmail(data.email);
//       setLoading(false);
//   };


//   const handlecopy = () => {
//     if(!email) return;
//     navigator.clipboard.writeText(email);
//     alert("Email copied to clipboard!");
//   }


//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem('templates')) || [];
//     setTemplates(saved);
//   }, []);


//   const handleSave = () => {
//         if (!email) return;

//         const newTemplate = { topic, tone, email };
//         const updated = [...templates, newTemplate];

//         setTemplates(updated);
//         localStorage.setItem("templates", JSON.stringify(updated));
//       };




//   return (
//     <>
//       <h1>AI Email Generator</h1>
//       <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}/>
//       <button onClick={handleGenerate}>{loading ? "Generating..." : "Generate"}</button>

//       <select value={tone} onChange={(e) => setTone(e.target.value)}>
//         <option>Professional</option>
//         <option>Formal</option>
//         <option>Friendly</option>
//       </select>

//       <div className='h-100 w-100 box-border size-32 border-4 p-4 mt-10'>
//             <button onClick={handlecopy} disabled={!email}>Copy</button>
//             {email}
//             <button onClick={handleSave} disabled={!email}>Save</button>
//       </div>

//       <h2>Saved Templates</h2>
//       {templates.map((t, index) => (
//         <div key={index} className="border p-2 mt-2">
//           <strong>{t.topic}</strong> ({t.tone})
//           <p>{t.email}</p>
//         </div>
//       ))}
//     </>
//   )
// }

// export default App






import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, MessageSquare, Settings } from "lucide-react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tone, setTone] = useState("professional");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const tones = [
    { id: "professional", label: "Professional", icon: "💼" },
    { id: "formal", label: "Formal", icon: "📄" },
    { id: "friendly", label: "Friendly", icon: "😊" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [inputValue]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInputValue("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: inputValue,
            tone,
          }),
        }
      );

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: data.email,
        time: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: "bot",
          content: "⚠️ Failed to generate email. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="logo">
            <Sparkles className="logo-icon" />
            <span className="logo-text">AI Email Generator</span>
          </div>
          <Settings size={18} />
        </div>
      </div>

      {/* Tone Selector */}
      <div className="tone-selector">
        <div className="tone-label">
          <MessageSquare size={14} /> Select Tone
        </div>
        <div className="tone-options">
          {tones.map((t) => (
            <button
              key={t.id}
              className={`tone-option ${
                tone === t.id ? "active" : ""
              }`}
              onClick={() => setTone(t.id)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="empty-state">
            <Sparkles size={40} />
            <p>Type a topic to generate an email</p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.type}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}

        {loading && (
          <div className="message bot">
            <div className="message-content">Generating...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter email topic (e.g. Sick leave request)"
          className="input-textarea"
          rows={1}
        />
        <button
          className="send-button"
          onClick={handleSend}
          disabled={!inputValue.trim() || loading}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default App;
