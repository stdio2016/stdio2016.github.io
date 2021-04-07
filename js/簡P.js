let 不能簡P = new Set(['SCRIPT', 'STYLE']);

function 簡(x) {
  if (x.nodeType == document.ELEMENT_NODE) {
    if (!不能簡P.has(x.nodeName)) {
      var n = x.childNodes.length;
      for (var i = 0; i < n; i++) {
        簡(x.childNodes[i]);
      }
    }
  }
  else if (x.nodeType == document.TEXT_NODE) {
    var t = x.textContent;
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
    簡(document.body);
  };
  document.body.insertBefore(btn, target);
});
