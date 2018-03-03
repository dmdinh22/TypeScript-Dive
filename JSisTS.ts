//Making JS Better
r] + []; // JavaScript will give you "" (which makes little sense), TypeScript will error

//
// other things that are nonsensical in JavaScript
// - don't give a runtime error (making debugging hard)
// - but TypeScript will give a compile time error (making debugging unnecessary)
//
{} + []; // JS : 0, TS Error
[] + {}; // JS : "[object Object]", TS Error
{} + {}; // JS : NaN or [object Object][object Object] depending upon browser, TS Error
"hello" - 1; // JS : NaN, TS Error

function add(a,b) {
  return
    a + b; // JS : undefined, TS Error 'unreachable code detected'
}

// Equality
console.log(5 == "5"); // true   , TS Error
console.log(5 === "5"); // false , TS Error

console.log("" == "0"); // false
console.log(0 == ""); // true

console.log("" === "0"); // false
console.log(0 === ""); // false

// Structural Equality - == / === not sufficient for objects
console.log({a:123} == {a:123}); // False
console.log({a:123} === {a:123}); // False

// to check objs - use deep-equal package 
import * as deepEqual from "deep-equal";

console.log(deepEqual({a:123},{a:123})); // True

// mutations are across all references 
var foo = {};
var bar = foo; // bar is a ref to the same obj

foo.baz = 123;
console.log(bar.baz); // 123

// equality is for refs
var foo = {};
var bar = foo; // bar is a ref
var baz = {}; // baz is a *new obj* distinct from `foo`

console.log(foo === bar); // true
console.log(foo === baz); // false

// null and undefined
// imagine you are doing `foo.bar == undefined` where bar can be one of:
console.log(undefined == undefined); // true
console.log(null == undefined); // true
console.log(0 == undefined); // false
console.log('' == undefined); // false
console.log(false == undefined); // false

if (typeof someglobal !== 'undefined') {
  // someglobal is now safe to use
  console.log(someglobal);
}

// this
function foo() {
  console.log(this);
}

foo(); // logs out the global e.g. `window` in browsers
let bar = {
  foo
}
bar.foo(); // Logs out `bar` as `foo` was called on `bar`

// closure
function outerFunction(arg) {
    var variableInOuterFunction = arg;

    function bar() {
        console.log(variableInOuterFunction); // Access a variable from the outer scope
    }

    // Call the local function to demonstrate that it has access to arg
    bar();
}

outerFunction("hello closure"); // logs hello closure!

// inner function accessing vars from outer scope after outer fn returned
function outerFunction(arg) {
    var variableInOuterFunction = arg;
    return function() {
        console.log(variableInOuterFunction);
    }
}

var innerFunction = outerFunction("hello closure!");

// Note the outerFunction has returned
innerFunction(); // logs hello closure!

// why closure is awesome
function createCounter() {
    let val = 0;
    return {
        increment() { val++ },
        getVal() { return val }
    }
}

let counter = createCounter();
counter.increment();
console.log(counter.getVal()); // 1
counter.increment();
console.log(counter.getVal()); // 2

// node.js example pseudocode
server.on(function handler(req, res) {
    loadData(req.id).then(function(data) {
        // the `res` has been closed over and is available
        res.send(data);
    })
    });

// NUMBER

// Decimal
console.log(.1 + .2); // 0.30000000000000004

// Integer
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
  // {max: 9007199254740991, min: -9007199254740991}

// Safe ints
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // true!

console.log(Number.MAX_SAFE_INTEGER);      // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);  // 9007199254740992 - Correct
console.log(Number.MAX_SAFE_INTEGER + 2);  // 9007199254740992 - Rounded!
console.log(Number.MAX_SAFE_INTEGER + 3);  // 9007199254740994 - Rounded - correct by luck
console.log(Number.MAX_SAFE_INTEGER + 4);  // 9007199254740996 - Rounded!

// check safety with ES6 Number.isSafeInteger
// Safe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true

// Unsafe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false

// Because it might have been rounded to it due to overflow
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)); // false

import { Big } from 'big.js';

export const foo = new Big('111.11111111111111111111');
export const bar = foo.plus(new Big('0.00000000000000000001'));

// To get a number:
const x: number = Number(bar.toString()); // Looses the precision

// NaN
console.log(Math.sqrt(-1)); //NaN

// Don't do this
console.log(NaN === NaN); // false!!

// Do this
console.log(Number.isNaN(NaN)); // true

// Infinity
console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
console.log(-Number.MAX_VALUE); // -1.7976931348623157e+308

console.log(Number.MAX_VALUE + 1 == Number.MAX_VALUE);   // true!
console.log(-Number.MAX_VALUE - 1 == -Number.MAX_VALUE); // true!

console.log(Number.MAX_VALUE + 10**1000);  // Infinity
console.log(-Number.MAX_VALUE - 10**1000); // -Infinity

console.log( 1 / 0); // Infinity
console.log(-1 / 0); // -Infinity

console.log(Number.POSITIVE_INFINITY === Infinity);  // true
console.log(Number.NEGATIVE_INFINITY === -Infinity); // true

console.log( Infinity >  1); // true
console.log(-Infinity < -1); // true

// Infinitesimal
console.log(Number.MIN_VALUE);  // 5e-324

console.log(Number.MIN_VALUE / 10);  // 0
