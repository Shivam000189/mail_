import {useEffect, useState } from 'react'

import './App.css'

function App() {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [tone , setTone] = useState("Professional");
  const [templates, setTemplates] = useState([]);
  

  const handleGenerate = async () => {
      if(!topic) return;

      setLoading(true);


      const response =  await fetch("http://localhost:5000/api/generate-email", {
        method:"POST",
        headers:{
          'content-Type' : 'application/json'
        },
        body : JSON.stringify({ topic, tone })
      });
      const data = await response.json();
      setEmail(data.email);
      setLoading(false);
  };


  const handlecopy = () => {
    if(!email) return;
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  }


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('templates')) || [];
    setTemplates(saved);
  }, []);

  const handleChange = () => {
    if(!topic) return;
  }

  const handleSave = () => {
        if (!email) return;

        const newTemplate = { topic, tone, email };
        const updated = [...templates, newTemplate];

        setTemplates(updated);
        localStorage.setItem("templates", JSON.stringify(updated));
      };




  return (
    <>
      <h1>AI Email Generator</h1>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}/>
      <button onClick={handleGenerate}>{loading ? "Generating..." : "Generate"}</button>

      <select value={tone} onChange={(e) => setTone(e.target.value)}>
        <option>Professional</option>
        <option>Formal</option>
        <option>Friendly</option>
      </select>

      <div className='h-100 w-100 box-border size-32 border-4 p-4 mt-10'>
            <button onClick={handlecopy} disabled={!email}>Copy</button>
            {email}
            <button onClick={handleSave} disabled={!email}>Save</button>
      </div>

      <h2>Saved Templates</h2>
      {templates.map((t, index) => (
        <div key={index} className="border p-2 mt-2">
          <strong>{t.topic}</strong> ({t.tone})
          <p>{t.email}</p>
        </div>
      ))}
    </>
  )
}

export default App
