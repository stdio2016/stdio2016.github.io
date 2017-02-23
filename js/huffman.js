function PriorityQueue() {
  this.arr = [null];
  this.priority = [0];
}

PriorityQueue.prototype.push = function (item, weight) {
  let i = this.arr.length;
  this.arr.push(item);
  this.priority.push(weight);
  while (i > 1 && this.priority[i >> 1] > weight) {
    this.priority[i] = this.priority[i >> 1];
    this.arr[i] = this.arr[i >> 1];
    i >>= 1;
    this.priority[i] = weight;
    this.arr[i] = item;
  }
};

PriorityQueue.prototype.pop = function () {
  let top = [this.arr[1], this.priority[1]];
  let item = this.arr.pop();
  let weight = this.priority.pop();
  if (this.length === 1) return top;
  this.arr[1] = item;
  this.priority[1] = weight;
  let i = 2;
  while (i + 1 < this.arr.length) {
    if (this.priority[i] > this.priority[i + 1]) {
      if (this.priority[i >> 1] > this.priority[i + 1]) {
        this.priority[i >> 1] = this.priority[i + 1];
        this.arr[i >> 1] = this.arr[i + 1];
        this.priority[i + 1] = weight;
        this.arr[i + 1] = item;
        i = i*2 + 2;
      }
      else {
        break;
      }
    }
    else {
      if (this.priority[i >> 1] > this.priority[i]) {
        this.priority[i >> 1] = this.priority[i];
        this.arr[i >> 1] = this.arr[i];
        this.priority[i] = weight;
        this.arr[i] = item;
        i = i*2;
      }
      else{
        break;
      }
    }
  }
  if (i + 1 == this.arr.length) {
    if (this.priority[i >> 1] > this.priority[i]) {
      this.priority[i >> 1] = this.priority[i];
      this.arr[i >> 1] = this.arr[i];
      this.priority[i] = weight;
      this.arr[i] = item;
    }
  }
  return top;
};

function getFreq(str) {
  let freq = new Map();
  for (let i = 0; i < str.length; i++) {
    let ch = str.charAt(i);
    if (freq.has(ch)) {
      freq.set(ch, freq.get(ch) + 1);
    }
    else {
      freq.set(ch, 1);
    }
  }
  return freq;
}

function Base64Reader(str) {
  this.str = str;
  this.pos = 0;
  this.bitPos = 6;
  this.b64 = 0;
}

Base64Reader.prototype.nextChar = function () {
  this.b64 = Base64Writer.base64Char.indexOf(this.str.charAt(this.pos));
  this.pos++;
};

Base64Reader.prototype.getBit = function () {
  if (this.bitPos === 6) {
    this.bitPos = 0;
    this.nextChar();
  }
  this.bitPos++;
  var bit = this.b64 >> (6 - this.bitPos) & 1;
  return bit;
};

function Base64Writer() {
  this.chars = [];
  this.pos = 0;
  this.trail = 0;
}

Base64Writer.base64Char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijk_mnopqrstuvwxyz0123456789+-$";

Base64Writer.prototype.putBit = function (bit) {
  this.pos++;
  this.trail = this.trail | bit << (6 - this.pos);
  if (this.pos == 6) {
    this.chars.push(Base64Writer.base64Char.charAt(this.trail));
    this.pos = 0;
    this.trail = 0;
  }
};

Base64Writer.prototype.setPadding = function () {
  if (this.chars.length === 0) {
    this.trail = this.pos << 3 | this.trail & 7;
  }
  else {
    var dat = Base64Writer.base64Char.indexOf(this.chars[0]);
    dat = (this.pos === 0 ? 6 : this.pos) << 3 | dat & 7;
    this.chars[0] = Base64Writer.base64Char.charAt(dat);
  }
};

Base64Writer.prototype.toString = function () {
  if (this.pos > 0)
    return this.chars.join('') + Base64Writer.base64Char.charAt(this.trail);
  return this.chars.join('');
};

Base64Writer.prototype.encodeDelta = function (delta) {
  var len = 1;
  var tmp = delta;
  while (tmp > 1) {
    len++;
    tmp >>= 1;
  }
  tmp = len;
  var len2 = 0;
  while (tmp > 1) {
    this.putBit(0);
    tmp >>= 1;
    len2++;
  }
  for (var i = len2; i >= 0; i--) {
    this.putBit(len >> i & 1);
  }
  for (var i = len - 2; i >= 0; i--) {
    this.putBit(delta >> i & 1);
  }
};

Base64Writer.prototype.encodeRice = function (num) {
  for (var i = 0; i < num; i++) {
    this.putBit(1);
  }
  this.putBit(0);
};

function Huffman() {
  this.enc = new Map();
  this.dec = [];
}

Huffman.buildTree = function (str) {
  var header = Huffman.buildHeadInfo(str);
  var huff = new Huffman();
  huff.canonicalCoding(header);
  return huff;
};

Huffman.buildHeadInfo = function (str) {
  if (!str) throw "cannot build tree from nothing";
  var freq = getFreq(str);
  var pq = new PriorityQueue();
  for (let [ch, count] of freq) {
    pq.push(ch, count);
  }
  const kinds = freq.size;
  for (let i = 0; i < kinds; i++) {
    let [chs1, count1] = pq.pop();
    let [chs2, count2] = pq.pop();
    pq.push([chs1, chs2], count1 + count2);
  }
  var tree = pq.pop()[0];
  var header = [];
  var maxLen = 0;
  function flatten(chs, level) {
    if (chs instanceof Array) {
      flatten(chs[0], level + 1);
      flatten(chs[1], level + 1);
    }
    else {
      if (level > maxLen) maxLen = level;
      header.push([chs, level]);
    }
  }
  flatten(tree, 0);
  return header;
};

Huffman.compress = function (str) {
  var buf = new Base64Writer();
  var tree = Huffman.buildTree(str);
  var head = Huffman.buildHeadInfo(str);
  buf.putBit(0); buf.putBit(0); buf.putBit(0);
  Huffman.encodeHeader(head, buf);
  tree.encodeStream(str, buf);
  return buf.toString();
};

Huffman.encodeHeader = function (header, buf) {
  header.sort((a,b) => a[0] > b[0] ? 1 : -1);
  buf.encodeDelta(header.length);
  var maxLen = 0;
  for (var i = 0; i < header.length; i++) {
    if (header[i][1] > maxLen){
      maxLen = header[i][1];
    }
  }
  buf.encodeRice(maxLen - header[0][1]);
  buf.encodeDelta(header[0][0].charCodeAt(0));
  for (var i = 1; i < header.length; i++) {
    buf.encodeRice(maxLen - header[i][1]);
    buf.encodeDelta(header[i][0].charCodeAt(0) - header[i-1][0].charCodeAt(0));
  }
};

Huffman.prototype.canonicalCoding = function (header) {
  header.sort((a, b) => {
    if (a[1] > b[1])
      return 1;
    if (a[1] < b[1])
      return -1;
    return a[0] > b[0] ? 1 : -1;
  });
  var map = new Map();
  var currentCode = [];
  var currentLen = 0;
  var currentDecode = [];
  const kinds = header.length;
  for (let i = 0; i < kinds; i++) {
    let ch = header[i][0];
    for (let x = currentLen; x < header[i][1]; x++) {
      currentCode.push(0);
      currentDecode.push([]);
    }
    currentLen = header[i][1];
    map.set(ch, currentCode.join(''));
    currentDecode[currentLen - 1].push(ch);
    for (let y = currentLen - 1; y >= 0; y--) {
      currentCode[y] = 1 - currentCode[y];
      if (currentCode[y] === 1) {
        break;
      }
      if (y > 0) {
        currentDecode[y - 1].push(currentDecode[y]);
        currentDecode[y] = [];
      }
    }
  }
  this.enc = map;
  this.dec = currentDecode[0];
};

Huffman.prototype.encode = function (str) {
  var buf = new Base64Writer();
  buf.putBit(0); buf.putBit(0); buf.putBit(0);
  this.encodeStream(str, buf);
  return buf.toString();
};

Huffman.prototype.encodeStream = function (str, buf) {
  for (var i = 0; i < str.length; i++) {
    var code = this.enc.get(str.charAt(i));
    for (var j = 0; j < code.length; j++) {
      buf.putBit(code.charCodeAt(j) - 48);
    }
  }
  buf.setPadding();
};

Huffman.prototype.decode = function (str) {
  var read = new Base64Reader(str);
  var frag = read.getBit();
  frag = frag * 2 + read.getBit();
  frag = frag * 2 + read.getBit();
  return this.decodeStream(read, frag);
};

Huffman.prototype.decodeStream = function (read, frag) {
  if (frag < 1 || frag > 6) {
    throw "invalid format";
  }
  var len = read.str.length;
  var out = '';
  while (read.pos < len || read.pos == len && read.bitPos < frag) {
    var dec = this.dec;
    do {
      dec = dec[read.getBit()];
    } while (dec instanceof Array);
    out += dec;
  }
  return out;
};
