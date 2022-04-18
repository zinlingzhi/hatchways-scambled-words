export function getIndex(split_words, rowIndex, colIndex) {
  var index = 0;
  split_words.map((rowValues, i) => {
    if ( i < rowIndex) {
      index += rowValues.length+1;
    } else {
      index += colIndex;
    }
  })
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