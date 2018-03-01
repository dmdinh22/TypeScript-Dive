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
