import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sentence, getSentence] = useState('')
  const readSentence = () => {
    axios.get('https://api.hatchways.io/assessment/sentences/1')
      .then((response) => {
        // const sentences = 
        getSentence(response.data.data.sentence)
      })
  }

  useEffect(() => {
    readSentence()
  },[])
  return (
    <div className="App">
      <p>{sentence}</p>
    </div>
  );
}

export default App;
