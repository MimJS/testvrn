/*

== Info ==

Function info :
name - getSimpleNumber
async - false
version - 2.0

Function props : 
name     | type            | value require                  | value possible | description
startNum | number \ array  | number or array of two numbers | min 2          | number from or to or range of numbers to get primary numbers
dir      | number          | number                         | 0 or 1         | direction: 0 inc, 1 desc

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

const checkValues = (startNum, dir) => {
  // check props type and value
  // check dir value
  if (typeof dir != "number" || dir < 0 || dir > 1) {
    throw new Error("dir is invalid. dir can be 0 or 1");
  }
  // check startNum value
  if (typeof startNum != "number" && !Array.isArray(startNum)) {
    throw new Error("startNum is invalid. startNum can be string or array");
  }
  if (Array.isArray(startNum)) {
    // array length < 2 or > 2 = error
    if (startNum.length != 2) {
      throw new Error(
        "Data in array startNum is invalid. Data length in array startNum can be only two numbers"
      );
    }
    // check numbers in array
    startNum.forEach((v, i) => {
      // check if is not number
      if (typeof v != "number") {
        throw new Error(
          "Data in array startNum is invalid. Data in array startNum can be only number"
        );
      }
      // check if is float
      if (!Number.isInteger(v)) {
        throw new Error(
          "Data in array startNum is invalid. Data in array startNum can't be float"
        );
      }
      // check if value < 2
      if (v < 2) {
        throw new Error(
          "Data in array startNum is invalid. Data in array startNum can be more or equal 2"
        );
      }
    });
    // sort array ( [234,2] => [2,234] )
    startNum.sort((a, b) => {
      if (b > a) {
        return -1;
      }
    });
    // reverse if dir = desc
    if (dir) {
      startNum.reverse();
    }
  } else {
    // check if is float
    if (!Number.isInteger(startNum)) {
      throw new Error("startNum is invalid. startNum can't be float");
    }
    // check if value < 2
    if (startNum < 2) {
      throw new Error("startNum is invalid. startNum can be more or equal 2");
    }
  }
  return { startNum, dir };
};

const getSimpleNumber = (start, direction) => {
  // check params in function
  const { startNum, dir } = checkValues(start, direction);
  // primary numbers array
  const numbers = [];
  // default value for dir = 1 if startNum isn't array
  const defaultDescValue = [startNum, 2];
  // default value for dir = 0 if startNum isn't array
  const defaultIncValue = [startNum, startNum + 100];
  // init data for cycle
  const [initNum, finishNum] = Array.isArray(startNum)
    ? startNum
    : dir
    ? defaultDescValue
    : defaultIncValue;
  // cycle consts
  let i = initNum - Number(dir ? 1 : -1);
  let length = dir ? i > finishNum : i < finishNum;
  const forOperation = () => {
    dir ? i-- : i++;
  };
  // label for for cycle
  nextPrime: for (i; length; ) {
    // check if in array numbers have 3 numbers for return they and close cycle
    if (numbers.length === 3) {
      return numbers;
    }
    // inc or desc i
    forOperation();
    // check if number is primary
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
    // check if numbers contain this number
    if (numbers.indexOf(i) === -1) {
      // add number to array
      numbers.push(i);
    }
  }
  // if array numbers length < 3
  return "Count of simple numbers is less of 3";
};

console.log(getSimpleNumber([2, 20], 1)); // success
console.log(getSimpleNumber([2, 20], 0)); // success
console.log(getSimpleNumber([454, 12], 0)); // success
console.log(getSimpleNumber([454, 12], 1)); // success
console.log(getSimpleNumber(34, 1)); // success
console.log(getSimpleNumber(34, 0)); // success
// console.log(getSimpleNumber([3],0)) // error
// console.log(getSimpleNumber([3.324],0)) // error
// console.log(getSimpleNumber([0],0)) // error
// console.log(getSimpleNumber([0,43],0)) // error
// console.log(getSimpleNumber([3,2,3],0)) // error
// console.log(getSimpleNumber([],0)) // error
// console.log(getSimpleNumber([3.234,12312],0)) // error
// console.log(getSimpleNumber('3',0)) // error
// console.log(getSimpleNumber(-1,0)) // error
// console.log(getSimpleNumber(1,0)) // error
// console.log(getSimpleNumber({},0)) // error
