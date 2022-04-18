import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useScramble from './hooks/useScramble';
import { getIndex, getSpaceIndex } from './utils/utils';

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

  useEffect(() => {

  }, [])

  const scrambeledSentence = useScramble(fetchedSentence);
  const words = fetchedSentence.split(" ");
  var split_words = [];
  words.map((word, index) => {
    const word_array = word.split("")
    split_words.push(word_array);
  })


  const handleKeyDown = () => {
    console.log("a")
  }

  
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
                  {words.map((char, jndex) =>(
                    <CharDiv key={`char-${jndex}`}className='char' count={index !== split_words.length-1 ? words.length+1 : words.length}>
                      <input id={getIndex(split_words, index, jndex)} className="char_input" maxLength={1} onKeyDown={handleKeyDown}/>
                    </CharDiv>
                  ))}
                  {index !== split_words.length-1 && (
                    <CharDiv className='char' count={words.length+1}>
                      <input id={getSpaceIndex(split_words, index)}className="char_input space" maxLength={1} onKeyDown={handleKeyDown}></input>
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