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
        <p>
          Input the message and link you want to post
        </p>
        message:
        <textarea value={message} onChange={handleMessageChange} />
        link:
        <textarea value={link} onChange={handleLinkChange} />

        <button onClick={handleClick}>
          submit
        </button>
      </header>
    </div>
  );
}

export default App;
