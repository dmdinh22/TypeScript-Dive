// Types can be implicit
var foo = 123;
foo = '456'; // Error: cannot assign 'string' to 'number'

    // Is foo a number or a string? 

// Types can be explicit
var foo: number = 123; 

var foo: number = '123'; // Error: cannot assign a 'string' to a 'number'

// Types are structural

interface Point2D {
    x: number;
    y: number;
}

interface Point3D {
    x: number;
    y: number;
    z: number;
}

var point2D: Point2D = {x: 5, y: 15}
var point3D: Point3D = {x: 5, y: 15, z: 25}
function iTakePoint2D(point:Point2D) {
    // do something
}

iTakePoint2D(point2D); // exact match OK
iTakePoint2D(point3D); // extra info OK
iTakePoint2D({x:0}); // Error: missing information for 'y'

// Types can be ambient
$('.awesome').show(); // Error: cannot find name '$'

// //quick fix
// declare var $: any;
// $('.awesome').show(); // all good!

// provide more definition to help protect from errors
declare var $: {
    (selector:string): any;
};
$('.awesome').show(); // all good!
$(123).show(); // Error: selector needs to be a string

// Future JS => NOW
class Point {
    constructor(public x: number, public y: number) {
    }
    add(point: Point){
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(5,15);
var p2 = new Point(15,25);
var p3 = p1.add(p2); // {x:20, y:40}

// fat arrow/ lambda fn
var inc = x => x+1;
