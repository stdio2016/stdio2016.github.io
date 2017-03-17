var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var board = {x:0, y:0, width:0, height:0};
var ui = {x: 0, y: 0, width: 0, height: 0};
var worker = new Worker('worker.js');
var Oj;
var Down;
var paused;
worker.digested = true;
worker.onmessage = function (e) {
  worker.digested = true;
  var result = e.data;
  if (Array.isArray(result)) {
    Oj = result[0];
    Dowm = result[1];
  }
};

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  var w = innerWidth;
  var h = innerHeight;
  if (w > h) {
    if (w < h * 1.2) h = w / 1.2;
    board.x = h / 11;
    board.y = h / 11;
    board.width = h * 9/11;
    board.height = h * 9/11;
    ui.x = h;
    ui.y = h / 6;
    ui.width = h / 6;
    ui.height = h * 5/6;
  }
  else {
    if (h < w * 1.2) w = h / 1.2;
    board.x = w / 11;
    board.y = w / 11;
    board.width = w * 9/11;
    board.height = w * 9/11;
    ui.x = w / 6;
    ui.y = w;
    ui.width = w * 5/6;
    ui.height = w /6;
  }
  draw();
}

function drawLine(x1,y1,x2,y2)
{
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.stroke();
}

function background()
{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  var i;
  var x = board.x, y = board.y;
  ctx.fillStyle='black';
  for(i=0;i<=9;i++)
    drawLine(x+i*board.width/9, y, x+i*board.width/9, y+board.height);
  for(i=0;i<=9;i++)
    drawLine(x, y+i*board.height/9, x+board.width, y+i*board.height/9);
}

function colorName(b)
{
  var color='none';
  switch(b)
  {
    case 1: color='red';break;
    case 2: color='lime';break;
    case 3: color='blue';break;
    case 4: color='yellow';break;
    case 5: color='orange';break;
    case 6: color='magenta';break;
    case 7: color='cyan';break;
    case 8: color='purple';break;
  }
  return color;
}

function drawCandy()
{
  if (!Oj) return;
  var grid = Math.min(board.width, board.height)/9 * 0.2;
  var i,j;
  var gh = board.height/9, gw = board.width/9;
  for(i=0;i<9;i++)
  {
    for(j=0;j<9;j++)
    {
      var r=Oj[i][j];
      if(r.color==0) continue;
      var color='white';
      var pos=r.pos/500;
      var x=gw*(i+0.5)+board.x;
      var y=gh*(j+0.5)+board.y;
      if(r.dir==1) y-=pos * gh;
      if(r.dir==2) y+=pos * gh;
      if(r.dir==3) x-=pos * gw;
      if(r.dir==4) x+=pos * gw;
      ctx.fillStyle=colorName(r.color);
      ctx.beginPath();
      ctx.arc(x, y, grid, 0, Math.PI*2, false);
      ctx.fill();
      ctx.fillstyle='black';
      ctx.beginPath();
      ctx.arc(x, y, grid, 0, Math.PI*2, false);
      ctx.stroke();
    }
  }
}

function drawArrow(x1, y1, x2, y2) {
  ctx.beginPath();
  var tmp = (x2 - x1) * 0.2;
  x2 -= tmp; x1 += tmp;
  tmp =(y2 - y1) * 0.2;
  y2 -= tmp; y1 += tmp;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x2 + ((y2-y1) + (x1-x2)) * 0.5, y2 + ((x2-x1) + (y1-y2)) * 0.5);
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 + ((y1-y2) + (x1-x2)) * 0.5, y2 + ((x1-x2) + (y1-y2)) * 0.5);
  ctx.stroke();
}

function drawUI()
{
  var landscape = ui.height > ui.width;
  var un;
  if (landscape) {
    un = ui.width / 2;
  }
  else {
    un = ui.height / 2;
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(ui.x, ui.y, un, un);
  ctx.fillStyle = 'lime';
  ctx.fillRect(ui.x + un, ui.y, un, un);
  ctx.fillStyle = 'blue';
  ctx.fillRect(ui.x, ui.y + un, un, un);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(ui.x + un, ui.y + un, un, un);
  var x = ui.x;
  var y = ui.y;
  if (landscape) {
    y += un * 2;
  }
  else {
    x += un * 2;
  }
  ctx.strokeStyle = 'black';
  ctx.strokeRect(x, y, un, un); // gravity up
  drawArrow(x+un/2, y+un, x+un/2, y);
  ctx.strokeRect(x + un, y, un, un); // gravity down
  drawArrow(x+un+un/2, y, x+un+un/2, y+un);
  ctx.strokeRect(x, y + un, un, un); // gravity left
  drawArrow(x+un, y+un+un/2, x, y+un+un/2);
  ctx.strokeRect(x + un, y + un, un, un); // gravity right
  drawArrow(x+un, y+un+un/2, x+un+un, y+un+un/2);
  if (landscape) {
    y += un * 2;
  }
  else {
    x += un * 2;
  }
  ctx.strokeRect(x, y, un, un);
  ctx.strokeRect(x+un, y, un, un);
  ctx.beginPath(); // no gravity
  ctx.arc(x+un/2, y+un/2, un*0.25, 0, Math.PI*2, false);
  ctx.stroke();


  ctx.strokeRect(x, y+un, un, un);
  ctx.strokeRect(x+un, y+un, un, un);
  ctx.moveTo(x+un*0.3, y+un*1.2); // step
  ctx.lineTo(x+un*0.3, y+un*1.8);
  ctx.lineTo(x+un*0.7, y+un*1.5);
  ctx.closePath();
  ctx.moveTo(x+un*0.7, y+un*1.2);
  ctx.lineTo(x+un*0.7, y+un*1.8);
  ctx.stroke();
  ctx.moveTo(x+un*1.3, y+un*1.2); // play
  ctx.lineTo(x+un*1.3, y+un*1.8);
  ctx.lineTo(x+un*1.7, y+un*1.5);
  ctx.closePath();
  ctx.stroke();
  if (landscape) {
    y += un * 2;
  }
  else {
    x += un * 2;
  }
  ctx.strokeRect(x, y, un, un);
  ctx.strokeRect(x+un*0.2, y+un*0.2, un*0.2, un*0.6); // pause
  ctx.strokeRect(x+un*0.6, y+un*0.2, un*0.2, un*0.6);
}

function draw()
{
  background();
  drawCandy();
  drawUI();
}

function loop()
{
  if (worker.digested) {
    if (paused)
    worker.postMessage('current');
    else {
      worker.postMessage('next');
    }
    worker.digested= false;
  }
  draw();
  requestAnimationFrame(loop);
}

resize();
loop();
addEventListener('resize', resize);
