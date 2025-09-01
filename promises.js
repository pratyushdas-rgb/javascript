const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Operation successful!");
  } else {
    reject("Something went wrong.");
  }
});

myPromise
  .then((message) => {
    console.log("Then:", message);
  })
  .catch((error) => {
    console.log("Catch:", error);
  });





  
  const delayedMessage = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This message is delayed by 2 seconds");
  }, 2000);
});

console.log("Start");

delayedMessage.then((msg) => {
  console.log(msg);
});

console.log("End");