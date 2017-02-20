var tracedCall = [];
var yeee = true;
function yeeyeeyee(native) {
    return function (...args) {
        if (yeee) {
            var cmd = [this.constructor.name, native.name];
            for (var i=0; i<args.length; i++){
                if(args[i] === null)
                    cmd.push(null);
                else if(typeof args[i] === 'function')
                    cmd.push(args[i].name);
                else if(typeof args[i] === 'object')
                    cmd.push(args[i].constructor.name);
                else {
                    cmd.push(args[i]);
                }
            }
            tracedCall.push(cmd);
        }
        return native.apply(this, args);
    };
}
function yeeyee(clas){
    var k = Object.getOwnPropertyDescriptors(clas.prototype);
    for (var i in k){
        var m = k[i];
        if(m.enumerable){
            if(m.set){
                Object.defineProperty(clas.prototype, i, {
                    get: m.get,
                    set: yeeyeeyee(m.set)
                });
            }
            else if(typeof m.value === 'function'){
               clas.prototype[i] = yeeyeeyee(m.value);
            }
        }
    }
}
yeeyee(CanvasRenderingContext2D);
yeeyee(WebGLRenderingContext);

var yeeee = requestAnimationFrame;
requestAnimationFrame = function(fun) {
    yeeee(function(t){
        yeee = false;
        fun(t);
    });
    requestAnimationFrame = yeeee;
};
function yee(){
    tracedCall = [];
    requestAnimationFrame = function(fun) {
        yeeee(function(t){
            yeee = true;
            fun(t);
            yeee = false;
        });
        requestAnimationFrame = yeeee;
    };
}
