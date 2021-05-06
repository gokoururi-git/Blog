let data = new Proxy({}, {
    get(obj, prop){
        console.log(`access '${prop}'`);
        return obj[prop];
    },
    set(obj, prop, value){
        console.log(`the data was changed from ${obj[prop]} to ${value}`);
        obj[prop] = value;
        return true;
    }
});


data.message = 'hello';

console.log(data.message);

data.message = 'world';