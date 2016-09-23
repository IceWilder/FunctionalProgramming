

function curry(fx) {
    var arity = fx.length
    console.log('arity-->', arity)
    return function f1() {
        var args = Array.prototype.slice.call(arguments, 0);
        if (args.length >= arity) {
            return fx.apply(null, args)
        } else {
            var f2 = function() {
                var args2 = Array.prototype.slice.call(arguments, 0);
                return fx.apply(null, args.concat(args2))
            }
            return f2

        }
    }
}

map = curry(function map(f, xs) {
    console.log(arguments)
    return xs.map(f);
})
reduce = curry(function(f, a, xs) {
    return xs.reduce(f, a);
});

function change(prev, next) {
    return prev + next;
}

function add(x) {
    return x + 1;
}
var xs = [1, 2, 3]
var s = map(add)(xs)
var t = reduce(change, 2)(xs)
console.log(s)
console.log(t)
