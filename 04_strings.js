let text = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
console.log(text.length) //26
console.log(text.charAt(0)); //A
console.log(text.charCodeAt(0)); //65 //The method returns a UTF-16 code (an integer between 0 and 65535).
console.log(text.at(2)); //C


let text1 = "Hello";
let text2 = "World";
let text3 = text1.concat(" ", text2);
console.log(text3); //Hello World

text4 = "Hello".concat(" ", "World!");
console.log(text4); //Hello World!

console.log(text.slice(7)); //HIJKLMNOPQRSTUVWXYZ
console.log(text.slice(-12)); //OPQRSTUVWXYZ
console.log(text.slice(7, 13)); //HIJKLM


console.log(text.toLowerCase()) //abcdefghijklmnopqrstuvwxyz
//trim() //remove spaces
//trimStart() //remove spaces from the beginning
//trimEnd() //remove spaces from the end


let text5 = "Please visit Microsoft!";
console.log(text5.replace("Microsoft", "Argusoft")); //Please visit Argusoft!


let names = "Rinku,Pratyush,Ashutosh";
console.log(names.split(',')); //[ 'Rinku', 'Pratyush', 'Ashutosh' ]


