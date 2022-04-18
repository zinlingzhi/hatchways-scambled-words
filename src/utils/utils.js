export function getIndex(split_words, rowIndex, colIndex) {
  var index = 0;
  if(rowIndex === 0){
    index = colIndex
  } else {
    
    for(let i = 0; i < rowIndex; i++) {
      index += (split_words[i].length + 1);
    }
    index += colIndex;
  }
  return index;
}

export function getSpaceIndex(split_words, rowIndex){
  var index = 0;
  split_words.map((rowValues, i) => {
    if ( i < rowIndex+1) {
      index += rowValues.length+1;
    } 
  })
  return index-1;
}