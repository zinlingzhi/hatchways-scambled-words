
function useScramble(sentence) {
  // Seperate words by space
  const words = sentence.split(' ');
  let res = '';
  words.map((word, index) => {
    res += shuffle(word)
    if (index !== words.length-1)
      res += " "
  })
  return res
}

function shuffle(word) {
  var characters = word.split("")
  var length = characters.length;
  if (length > 2){
    for(var i = length - 2; i > 1; i--){
      var j = Math.floor(Math.random() * (i+1));
      j = j === 0 || j === length-1 ? 1 : j;
      var temp = characters[i];
      characters[i] = characters[j];
      characters[j] = temp;
    }
  }

  return characters.join("");
}
export default useScramble;


