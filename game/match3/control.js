var dragFun = function () {};

function setColorFunc(color) {
  return function (x, y) {
    worker.postMessage(['setColor', x, y, color]);
  };
}

function setGravityFunc(dir) {
  return function (x, y) {
    worker.postMessage(['setG', x, y, dir]);
  };
}

function playFunc() {
  paused = false;
}
function stepFunc() {
  worker.postMessage('next');
}
function pauseFunc() {
  paused = true;
}

var funcTable = [setColorFunc(1), setColorFunc(2), setColorFunc(3), setColorFunc(4),
  setGravityFunc(2), setGravityFunc(1), setGravityFunc(4), setGravityFunc(3),
  setGravityFunc(0), setColorFunc(0), stepFunc, playFunc, pauseFunc, dragFun,
  dragFun];

function click(e) {
  var px = Math.floor((e.clientX - board.x) / board.width * 9);
  var py = Math.floor((e.clientY - board.y) / board.height * 9);
  if (px>=0 && px<9 && py>=0 && py<9) {
    drag(e);
  }
  else {
    var s = Math.min(ui.width, ui.height);
    px = Math.floor((e.clientX - ui.x) / s * 2);
    py = Math.floor((e.clientY - ui.y) / s * 2);
    var i;
    if (ui.height > ui.width) {
      if (px >= 2 || px < 0 || py >= 7 || py < 0) return;
      i = py * 2 + px;
    }
    else {
      if (px >= 7 || px < 0 || py >= 2 || py < 0) return;
      i = px % 2 + py * 2 + Math.floor(px / 2) * 4;
    }
    if (i >= 10)
      funcTable[i]();
    else
      dragFun = funcTable[i];
  }
}

function drag(e) {
  if ((e.buttons & 1) == 0) return;
  var px = Math.floor((e.clientX - board.x) / board.width * 9);
  var py = Math.floor((e.clientY - board.y) / board.height * 9);
  if (px>=0 && px<9 && py>=0 && py<9) {
    dragFun(px, py);
  }
}

canvas.addEventListener('mousedown', click);
canvas.addEventListener('mousemove', drag);
