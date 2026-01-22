
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
        "https://mail-1-d1nc.onrender.com",
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
