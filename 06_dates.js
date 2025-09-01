let mydate = new Date()
console.log(mydate);

console.log(mydate.toString()); //Thu Jul 24 2025 10:29:59 GMT+0530 (India Standard Time)
console.log(mydate.toDateString()); //Thu Jul 24 2025
console.log(mydate.toJSON());

console.log(typeof(mydate)); //object

let myCreatedDate = new Date(2023,0,30);
console.log(myCreatedDate.toDateString()); //Mon Jan 30 2023

let myTimeStamp = Date.now();
console.log(myTimeStamp); //1753333829849  (millisecond mein aata hai)

console.log(myCreatedDate.getTime());
console.log(myCreatedDate.getMonth()+1); //month 0 se start hota hai


