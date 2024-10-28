const calculateLengthString = function(inputString, maxLength){
  return inputString.length <= maxLength;
};

calculateLengthString('Привffff', 5);


const checkPalindrom = function(inputString){
  const str = inputString.replaceAll(' ', '').toUpperCase();
  let strReverse = '';
  for(let i = str.length - 1; i >= 0; i--){
    strReverse += str.charAt(i);
  }
  return str === strReverse;
};

checkPalindrom('оппо');

const checkNumber = function(inputString){
  let digits = '';
  for(let i = 0; i <= inputString.length; i++){
    const num = inputString[i];
    const verifiedNumber = parseInt(num, 10);

    if(!Number.isNaN(verifiedNumber)){
      digits += num;
    }
  }
  return digits;
};

checkNumber('123ggg34');
