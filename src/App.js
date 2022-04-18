import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useScramble from './hooks/useScramble';
import { getIndex, getSpaceIndex } from './utils/utils';

import './App.css';

function App() {
  const [fetchedSentence, setFetchedSentence] = useState('');
  const [score, setScore] = useState(1);
  const formcontainer = useRef(null);
  const readSentence = () => {
    axios.get(`https://api.hatchways.io/assessment/sentences/${score}`)
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


  const handleKeyDown = (event) => {
    const pressedKey = event.key.toLowerCase();
    
    if (pressedKey.length !== 1 && pressedKey != "backspace" && pressedKey != " "){
      return;
    }
    const isLetter = (pressedKey >= "a" && pressedKey <= "z")
    const isNumber = (pressedKey >= "0" && pressedKey <= "9")
    const isSpace = pressedKey == " " ? true: false;
    const isBackSpace = pressedKey == "backspace" ? true : false;

    

    if(isLetter || isNumber || isSpace) {
      const form = event.target.form;
      const elements = form.elements;
      const index = [...form].indexOf(event.target);
      if (index !== elements.length-1) {
        if (index == 0) {
          if (pressedKey.length != 1){
            return ;
          }
        }
        elements[index].value = event.key;
        const elementsClassName = elements[index].className;
        if(fetchedSentence[index] === event.key) {
          if(elementsClassName.includes('char_input')){
            elements[index].className = "char_input success"
          }
          if(elementsClassName.includes('space_input')){
            elements[index].className = "space_input success"
          }
        } else {
          if(elementsClassName.includes('char_input')){
            elements[index].className = "char_input"
          }
          if(elementsClassName.includes('space_input')){
            elements[index].className = "space_input"
          }
        }
        elements[index+1].focus();
        
        let finished = true;
        for (let i = 0; i < elements.length-2; i++) {
          if(!(elements[i].className.includes('success'))){
            finished = false;
          }
        }
        if (finished){
          form.elements[elements.length-1].className = "button success"
          form.elements[elements.length-1].disabled = false
        } else {
          form.elements[elements.length-1].className = "button"
          form.elements[elements.length-1].disabled = true
        }
        

        event.preventDefault();
      } 
    }

    if(isBackSpace) {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index].value = "";
      if(index !== 0) {
        form.elements[index-1].focus();
      } 
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setScore(score+1);
    readSentence();
    
    // const elements = formcontainer.current.elements;
    // console.log(elements)
    // for (let i = 0; i < elements.length-1; i++){
    //   elements[i].value="";
    //   if(elements[i].className.includes('success')){
    //     elements[i].className.replace(' success', '');
    //   }
    // }
    
  }

  
  return (
    <div className="App">
      <div className="main">
          <p className="scrambled_sentence">{scrambeledSentence}</p>
          <p className="explain_text">Guess the sentence! Start typing. </p>
          <p className="explain_text"> The yellow blocks are meant for spaces</p>
          <p className="score_text">Score: {score-1}</p>
          <div className="keyboard">
            <form onSubmit={handleSubmit} ref={formcontainer}>
              {
                split_words.map((words, index) => (
                  <div key={`word-${index}`} className='word'>
                    {words.map((char, jndex) =>(
                      <CharDiv key={`char-${jndex}`} className='char' count={index !== split_words.length-1 ? words.length+1 : words.length}>
                        <input id={getIndex(split_words, index, jndex)} className="char_input" maxLength={1} onKeyDown={handleKeyDown}/>
                      </CharDiv>
                    ))}
                    {index !== split_words.length-1 && (
                      <CharDiv className='char' count={words.length+1}>
                        <input id="space" className="space_input" maxLength={1} onKeyDown={handleKeyDown}></input>
                      </CharDiv>
                    )}
                  </div>
                ))
              }
              <div className="submit">
                <input type="submit" className='button' value="Next" disabled></input>
              </div>
              
            </form>
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
    width: 100%;
    &.success{
      background-color: #4caf50;
    }
  }

  .space_input{
    outline: 0;
    border: 0;
    background-color: #ffb74d;
    height: 50px;
    text-align: center;
    font-size: 16px;
    width: 100%;
    &.success{
      background-color: #4caf50;
    }
  }

`