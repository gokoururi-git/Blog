const observe = require('./observe');
const obj = {
  name: 'dog'
}
observe(obj, 'name', (val, newVal)=>{
  console.log('the data was changed from ' + val + ' to ' + newVal);
  return 'checked: ' + newVal;
});

console.log(obj.name);
obj.name = "cat";
console.log(obj.name);