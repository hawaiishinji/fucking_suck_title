import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {

  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  }
  
  const handleClick = () => {
    console.log('click', message, link)
    axios.post('/api/post', {message, link}).then((result) => {
      console.log('result', result.data)
    }).catch((err)=>{
      if (err.response) {
        
        console.log('error', err.response.data)
      } else {

        console.log('error', err)
      }
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>靠北爛標題</h1>
        <p>
          請輸入留言以及爛標題的連結
        </p>
        留言:
        <textarea value={message} onChange={handleMessageChange} />
        連結: (必填)
        <textarea value={link} onChange={handleLinkChange} />

        <button onClick={handleClick}>
          送出
        </button>
      </header>
    </div>
  );
}

export default App;
