function sortByKey(arr,key){
    return [...arr].sort((a,b)=> a[key] - b[key]);

}

const users = [
    {name: "Pratyush", age: 23},
    {name: "Rinku", age:20},
    {name: "Charlie", age:35}
]

console.log(users,"age");
