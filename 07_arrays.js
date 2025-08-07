const cars = ["Saab", "Volvo", "BMW"];

//empty array
const cars2 = [];
//created an empty array, and provide elements later:
cars[0]= "Saab";
cars[1]= "Volvo";
cars[2]= "BMW";

//Using the JavaScript Keyword new
const cars3 = new Array("Saab", "Volvo", "BMW");

//Accessing Array elements
console.log(cars[0]); //Saab
console.log(cars[1]); //Volvo

//Changing an Array Element
cars2[0] = "Tata";
console.log(cars2[0]); //Tata

//Converting an Array to a String
car3String = cars3.toString();
console.log(car3String); //Saab,Volvo,BMW
console.log(typeof(car3String)); //string

//Access the Full Array
console.log(cars); //[ 'Saab', 'Volvo', 'BMW' ]

//data type of array
console.log(typeof(cars)); //object

//The length Property
console.log(cars.length);//3

//Accessing 1st and last element of an array
console.log(cars[0]); //Saab
console.log(cars[cars.length-1]);//BMW

//Adding Array Elements
const fruits = ["Banana", "Orange", "Apple"];
fruits.push("Lemon");  // Adds a new element (Lemon) to fruits

fruits[fruits.length] = "Pineapple";  // Adds "Pineapple" to fruits

console.log(fruits); //[ 'Banana', 'Orange', 'Apple', 'Lemon', 'Pineapple' ]


const points = new Array();
const points2 = [];


//----------------Array Methods-----------------------

//length Property
console.log(fruits.length); //5

//toString()
let myList = fruits.toString();
console.log(myList); //Banana,Orange,Apple,Lemon,Pineapple

//at()
console.log(fruits.at(2)); //Apple

//join()
/* The join() method also joins all array elements into a string.

It behaves just like toString(), but in addition you can specify the separator: */

let joinFruits = fruits.join(" * ");
console.log(joinFruits); //Banana * Orange * Apple * Lemon * Pineapple

//pop()
//The pop() method removes the last element from an array:
poparray = fruits.pop();
console.log(poparray); //Pineapple
console.log(fruits); //[ 'Banana', 'Orange', 'Apple', 'Lemon' ]

//push()
fruits.push("Kiwi");
console.log(fruits); //[ 'Banana', 'Orange', 'Apple', 'Lemon', 'Kiwi' ]

//shift()
//The shift() method removes the first array element and "shifts" all other elements to a lower index.
fruits.shift();
console.log(fruits); //[ 'Orange', 'Apple', 'Lemon', 'Kiwi' ]

//unshift()
//The unshift() method adds a new element to an array (at the beginning), and "unshifts" older elements:
fruits.unshift("Lemon");
console.log(fruits); //[ 'Lemon', 'Orange', 'Apple', 'Lemon', 'Kiwi' ]

//Array delete()
delete fruits[0];
console.log(fruits); //[ <1 empty item>, 'Orange', 'Apple', 'Lemon', 'Kiwi' ]

//concat()
const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];

const myChildren = myGirls.concat(myBoys);
console.log(myChildren); //[ 'Cecilie', 'Lone', 'Emil', 'Tobias', 'Linus' ]

//Merging 3 array
const arr1 = ["Cecilie", "Lone"];
const arr2 = ["Emil", "Tobias", "Linus"];
const arr3 = ["Robin", "Morgan"];
const myChildren2 = arr1.concat(arr2, arr3);
console.log(myChildren2); /*[
  'Cecilie', 'Lone',
  'Emil',    'Tobias',
  'Linus',   'Robin',
  'Morgan'
]*/








