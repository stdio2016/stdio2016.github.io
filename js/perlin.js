(function(){
function makeMatrix(width,height)
{
    var arr=[];
    for(var i=0;i<height;i++){
        var ma=[];
        for(var j=0;j<width;j++){
            ma.push(0);
        }
        arr.push(ma);
    }
    return arr;
}

function makeRandom(width,height)
{
    var arr=[];
    for(var i=0;i<height;i++){
        var ma=[];
        for(var j=0;j<width;j++){
            ma.push(Math.random());
        }
        arr.push(ma);
    }
    return arr;
}
var perlin=makeMatrix(256,256);

var canvas=document.createElement('canvas');
canvas.width=canvas.height=256;
var ctx=canvas.getContext('2d');

function interpolate(a, b, ratio)
{
    // 6*t^5 - 15*t^4 + 10*t^3
    var f = ((6 * ratio - 15) * ratio + 10) * ratio * ratio * ratio;
    return a * (1 - f) + b * f;
}

function addPerlin(mat, amp)
{
    var perlinWidth = perlin.length;
    var perlinHeight = perlin[0].length;
    var width = mat.length;
    var height = mat[0].length;
    for(var y = 0; y < perlinHeight; y++){
        var i = y * (height / perlinHeight);
        var i1 = Math.floor(i);
        var ir = i - i1;
        var i2 = (i1 + 1) % height;
        for(var x = 0; x < perlinWidth; x++){
            var j = x * (width / perlinWidth);
            var j1 = Math.floor(j);
            var jr = j - j1;
            var j2 = (j1 + 1) % height;

            var up = interpolate(mat[i1][j1], mat[i1][j2], jr);
            var down = interpolate(mat[i2][j1], mat[i2][j2], jr);
            perlin[y][x] += interpolate(up, down, ir) * amp;
        }
    }
}

{
    var sum = 1/((1-Math.pow(2/3,4))*3);
    addPerlin(makeRandom(8, 8), sum*1);
    addPerlin(makeRandom(16, 16), sum*2/3);
    addPerlin(makeRandom(32, 32), sum*4/9);
    addPerlin(makeRandom(64, 64), sum*8/27);
}

function draw(red, green, blue){
    var height = canvas.height;
    var width = canvas.width;
    var bmp = ctx.getImageData(0, 0, 256, 256);
    var data = bmp.data;
    for(var i=0;i<height;i++){
        for(var j=0;j<width;j++){
            var index = (i * width + j) * 4;
            data[index + 0] = ~~((perlin[i][j] * 0.2 + 0.8) * red);
            data[index + 1] = ~~((perlin[i][j] * 0.2 + 0.8) * green);
            data[index + 2] = ~~((perlin[i][j] * 0.2 + 0.8) * blue);
            data[index + 3] = 255;
        }
    }
    ctx.putImageData(bmp, 0, 0);
    document.documentElement.style.backgroundImage='url("' + canvas.toDataURL() + '")';
}
if(!document.body)
    document.write("<div style='display:none;'>dummy div to make a body element</div>");
if(!window.backgroundColor)
    window.backgroundColor = [144, 238, 144];
draw(backgroundColor[0], backgroundColor[1], backgroundColor[2]);
})();
