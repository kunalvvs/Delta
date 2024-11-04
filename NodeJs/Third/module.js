
const sum = (a, b) => a+b;
const mul = (a, b) => a*b;
const g = 9.8;
const PI = 3.14;

//this is another way to write exports in short
// exports.sum = (a, b) => a+b;
// exports.mul = (a, b) => a*b;
// exports.g = 9.8;
// exports.PI = 3.14;

let obj = {
    sum:sum,
    mul:mul,
    g:g,
    PI:PI
};

//Another way to write module.export

// module.exports = {
//     sum:sum,
//     mul:mul,
//     g:g,
//     PI:PI
// };
module.exports = obj;

