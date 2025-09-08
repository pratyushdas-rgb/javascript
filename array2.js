function getUniqueElements(array){
    return [...new Set(array)];
}

console.log(getUniqueElements([1,2,3,4,5,6,6,5,4,6]));