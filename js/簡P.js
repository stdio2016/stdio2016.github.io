let 不能簡P = new Set(['SCRIPT', 'STYLE']);
let 簡過 = false;

function 簡(x,簡過) {
  if (x.nodeType == document.ELEMENT_NODE) {
    if (!不能簡P.has(x.nodeName)) {
      var n = x.childNodes.length;
      for (var i = 0; i < n; i++) {
        簡(x.childNodes[i],簡過);
      }
    }
  }
  else if (x.nodeType == document.TEXT_NODE) {
    if (簡過) {
      x.textContent = x.old;
      delete x.old;
      return;
    }
    var t = x.textContent;
    x.old = t;
    t = t.replace(/^\s+|\s+$/g, '');
    var head = t.match(/^\p{P}*/u)[0].length;
    if ((t.charCodeAt(head)&0xd800) == 0xd800) head++;
    var tail = t.match(/\p{P}*$/u)[0].length;
    if ((t.charCodeAt(t.length-1-tail)&0xd800) == 0xd800) tail++;
    if (head + tail < t.length - 2) {
      t = t.substring(0, head+1) + t.substring(t.length-tail-1, t.length);
    }
    x.textContent = t;
  }
}

addEventListener('load', function () {
  var btn = document.createElement('button');
  var target = document.querySelector('body > hr');
  btn.innerHTML = '簡稱APP';
  btn.onclick = function () {
    簡(document.body,簡過);
    簡過=!簡過;
  };
  document.body.insertBefore(btn, target);
});
