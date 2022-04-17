import { useEffect, useState } from 'react';
import axios from 'axios';
import useScramble from './hooks/useScramble';
import styled from 'styled-components';
import './App.css';

function App() {
  const [fetchedSentence, setFetchedSentence] = useState('');
  const [score, setScore] = useState(0);
  const readSentence = () => {
    axios.get('https://api.hatchways.io/assessment/sentences/1')
      .then((response) => {
        // const sentences = 
        setFetchedSentence(response.data.data.sentence)
      })
  }

  useEffect(() => {
    readSentence()
  },[])

  const scrambeledSentence = useScramble(fetchedSentence);
  const words = fetchedSentence.split(" ");
  var split_words = [];
  words.map((word, index) => {
    const word_array = word.split("")
    split_words.push(word_array);
  })
  return (
    <div className="App">
      <div className="main">
          <p className="scrambled_sentence">{scrambeledSentence}</p>
          <p className="explain_text">Guess the sentence! Start typing. </p>
          <p className="explain_text"> The yellow blocks are meant for spaces</p>
          <p className="score_text">Score: {score}</p>
          <div className="keyboard">
            {
              split_words.map((words, index) => (
                <div key={`word-${index}`} className='word'>
                  {words.map((char, index1) =>(
                    <CharDiv className='char' count={index !== split_words.length-1 ? words.length+1 : words.length}>
                      <input className="char_input" maxLength={1}/>
                    </CharDiv>
                  ))}
                  {index !== split_words.length-1 && (
                    <CharDiv className='char' count={words.length+1}>
                      <input className="char_input space" maxLength={1} autoFocus={true}></input>
                    </CharDiv>
                  )}
                </div>
              ))
            }
          </div>
      </div>
    </div>
  );
}

export default App;

const CharDiv = styled.div`
  width: ${props => 100 / props.count}%;
  background: white;
  padding: 10px;

  .char_input{
    outline: 0;
    border: 0;
    background-color: #e1e1e1;
    height: 50px;
    text-align: center;
    font-size: 16px;
    &.space{
      background-color: #ffb74d;
    }
  }
`