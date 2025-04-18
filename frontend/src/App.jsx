import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/test`)
      .then(res => setMessage(res.data));
  }, []);

  return <h1>{message}</h1>;
}

export default App;
