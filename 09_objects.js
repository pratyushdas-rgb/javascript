//creating an object

const person = {
    firstName:"John",
    lastName:"Doe",
    age:50,
    eyeColor:"blue"
};

const person2 = {};

// Add Properties
person2.firstName = "John";
person2.lastName = "Doe";
person2.age = 50;
person2.eyeColor = "blue";

console.log(person2) //{ firstName: 'John', lastName: 'Doe', age: 50, eyeColor: 'blue' }

//using the new keyword

const person3 = new Object();

// Add Properties
person3.firstName = "John";
person3.lastName = "Doe";
person3.age = 50;
person3.eyeColor = "blue";

//Accessing the values
console.log(person3["firstName"]); //John

// Objects are objects
// Maths are objects
// Functions are objects
// Dates are objects
// Arrays are objects
// Maps are objects
// Sets are objects

// JavaScript Objects are Mutable
// Objects are mutable: They are addressed by reference, not by value.

// If person is an object, the following statement will not create a copy of person

const x = person;
x.age = 200;
console.log("x: "+x["age"]); //x: 200
console.log("Person: "+person["age"]); //Person: 200

//-----------------------Object Properties-------------------

//Accessing JavaScript Properties
eg1 = person.age;
console.log(eg1); //200

eg2 = person["age"];
console.log(eg2); //200

//Adding New Properties
person.height = "6 feet";
console.log(person.height); //6 feet

//Deleting Properties
delete person.height;
console.log(person); //{ firstName: 'John', lastName: 'Doe', age: 200, eyeColor: 'blue' }



