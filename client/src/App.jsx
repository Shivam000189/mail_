import { useState } from 'react'

import './App.css'

function App() {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");

  const handleGenerate = () => {
    setEmail(`This is a professional email about ${topic}`);
  }

  return (
    <>
      <h1>AI Email Generator</h1>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}/>
      <button onClick={handleGenerate}>Generate</button>

      <div className='h-100 w-100 box-border size-32 border-4 p-4 mt-10'>
           
          {email}
      </div>
    </>
  )
}

export default App
