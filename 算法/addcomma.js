function addcomma(number){
  number = String(number);
  let ss = number.split('');
  for(let i = ss.length - 3; i > 0; i -= 3){
    ss.splice(i, 0, ',');
  }
  return ss.join('');
}


console.log(addcomma(123456789123), Number(123456789123).toLocaleString());