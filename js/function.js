let lengthString = function(inputString, maxLength){
  if (inputString.length > maxLength){
    console.log('Длина строки больше ' + maxLength);
  } else if(inputString.length < maxLength){
    console.log('Длина строки меньше ' + maxLength);
  }else{
    console.log('Длина строки равна ' + maxLength)
  }
}

lengthString('Прив', 5)


let checkPalindrom = function(inputString){
  let str = inputString.replaceAll(' ', '').toUpperCase();
  let strReverse = '';
  for(let i = str.length - 1; i >= 0; i--){
    strReverse += str.charAt(i);
  }
  return str === strReverse;
}

console.log(checkPalindrom('оппо'));

let checkNumber = function(inputString){
  let str = inputString;
  let digits = '';
  for(i = 0; i <= str.length; i++ ){
    let num = str[i];
    let verifiedNumber = parseInt(num);

    if(!Number.isNaN(verifiedNumber)){
      digits += num;
    }
    }
  }
  return parseInt(digits);
}

console.log(checkNumber('123ggg34'));
