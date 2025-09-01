let score = "33";
console.log(typeof(score)); //string

let valueInNumber = Number(score)
console.log(typeof(valueInNumber)); //number

let score2 = "33abc";
let valueInNumber2 = Number(score2);
console.log(typeof(valueInNumber2)); //number
console.log(valueInNumber2); //NaN

let a = true;
let b = Number(a);
console.log(b) // 1 if false then 0

// null kaa number conversion bhi 0
//abc aisa string hota toh NaN(Not a Number)


let isLoggedin = 1;
let toBoolean = Boolean(isLoggedin);
console.log(toBoolean); //true
//1 => true, "" => false, "Pratyush" => true

//-----------------------Operations------------------------

let value = 3
let negValue= -value
console.log(negValue); //-3

console.log(2+2); //+-*/

console.log("1"+2); //12
console.log("1"+2+2);//122
console.log(1+2+"2"); //32

