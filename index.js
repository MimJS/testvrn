/*

== Info ==

Function info :
name - getSimpleNumber
async - false
version - 1.0

Function props : 
name | type | default value | value require | value possible | description
startNum | number \ string | - | number or number in string or two number in string after comma ( ex. '5,123' ) | min 2 | number from or to or range of numbers to get primary numbers
dir | number | 0 | number | 0 or 1 | direction: 0 inc, 1 desc
arrayView | boolean | true | true or false | return data in array or string

Author : 
MimJS

Vk : 
https://vk.com/mimjs

Github : 
https://github.com/mimjs

Original code url :
https://github.com/mimjs/testvrn

== Info ==

*/

const getSimpleNumber = (startNum, dir = 0, arrayView = true) => {
  // check props type and value
  // check dir value
  if (typeof dir != "number" || dir < 0 || dir > 1) {
    throw new Error("dir is invalid. dir can be 0 or 1");
  }
  // check startNum value if is number
  if (startNum < 2) {
    throw new Error("startNum is invalid. startNum can be more or equal 2");
  }
  // check startNum value if is string
  if (typeof startNum === "string") {
    // check if startNum string is number in string
    if (!startNum.includes(",")) {
      if (!isNaN(Number(startNum))) {
        startNum = Number(Number);
      } else {
        throw new Error(
          "startNum is invalid. startNum can be number or number in string"
        );
      }
    } else {
      // get all numbers in array from startNum
      const numArray = startNum.split(",");
      // check length and value of data in array numArray
      if (
        numArray.length < 0 ||
        numArray.length > 2 ||
        numArray[0].length == 0 ||
        numArray[1].length == 0
      ) {
        throw new Error(
          "startNum is invalid. startNum can be one or two numbers"
        );
      }
      // check values of array numArray
      if (Number(numArray[0]) < 2 || Number(numArray[1]) < 2) {
        throw new Error("startNum is invalid. startNum can be more or equal 2");
      }
      // reverse array if first value is bigger than second in array numArray
      if (Number(numArray[0]) > Number(numArray[1])) {
        startNum = [numArray[1], numArray[0]];
      } else {
        startNum = numArray;
      }
      // reverse array numArray if dir = 1 ( true )
      if (dir) {
        startNum.reverse();
      }
    }
  }
  // primary numbers array
  const numbers = [];
  // data for cycle
  const [initNum, finishNum] = Array.isArray(startNum)
    ? startNum
    : dir
    ? [startNum, 2]
    : [startNum, startNum + 200];
  // label for cycle
  nextPrime: for (
    let i = Math.floor(Number(initNum) - Number(dir ? 1 : -1));
    dir ? i > Math.floor(Number(finishNum)) : i < Math.floor(Number(finishNum));
    dir ? i-- : i++
  ) {
    // check if in array numbers have 3 numbers for return they and close cycle
    if (numbers.length === 3) {
      return arrayView ? numbers : numbers.join(",");
    }
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    numbers.push(i);
  }
  return "Count of simple numbers is less of 3";
};

console.log(getSimpleNumber("3,50", 0, true));
console.log(getSimpleNumber(5, 0, true));
console.log(getSimpleNumber(4000000, 1));
console.log(getSimpleNumber("4,40000000", 1, true));