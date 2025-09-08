const jsonString = '{"name":"Pratyush", "age":23 }';
const obj = JSON.parse(jsonString);
console.log(obj);

const newJsonString = JSON.stringify(obj);
console.log(newJsonString);

