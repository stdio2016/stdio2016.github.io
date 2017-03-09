/*
objects supported by structured clone:
null
undefined
string/boolean/number primitive type
Boolean object
Number object
String object
Date
RegExp source and flags

ArrayBuffer length and buffer
%TypedArray% buffer, byte offset, and length
DataView buffer, byte offset, and length
ImageData image size and pixel data
Map keys and values
Set elements

Blob
File
FileList

will preserve enumerable properties:
Array
Object (just includes plain object)
properties in prototype does not get duplicated
*/
var myCopySym = (this.Symbol || String)('stdio2016_CopyFunc');

function simpleCopy(objType) {
  return function (tryCopy, refs) {
    var cp = new objType(this);
    refs.set(this, cp);
    return cp;
  };
}

// Boolean object is strange
Boolean.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = new Boolean(this.valueOf());
  refs.set(this, cp);
  return cp;
};
Number.prototype[myCopySym] = simpleCopy(Number);
String.prototype[myCopySym] = simpleCopy(String);
Date.prototype[myCopySym] = simpleCopy(Date);
RegExp.prototype[myCopySym] = simpleCopy(RegExp);

ArrayBuffer.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = this.slice(0);
  refs.set(this, cp);
  return cp;
};

var TypedArray = Object.getPrototypeOf(Int8Array);
TypedArray.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = tryCopy(this.buffer);
  cp = new (this.constructor)(cp, this.byteOffset, this.length);
  refs.set(this, cp);
  return cp;
};
DataView.prototype[myCopySym] = TypedArray.prototype[myCopySym];

ImageData.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = tryCopy(this.data);
  cp = new ImageData(cp, this.width, this.height);
  refs.set(this, cp);
  return cp;
};

Map.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = new Map();
  refs.set(this, cp);
  this.forEach(function (v, k) {
    var k = tryCopy(k);
    var v = tryCopy(v);
    cp.set(k, v);
  });
  return cp;
};

Set.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = new Set();
  refs.set(this, cp);
  this.forEach(function (v) {
    var v = tryCopy(v);
    cp.add(v);
  });
  return cp;
};

Blob.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = this.slice(0);
  refs.set(this, cp);
  return cp;
};

File.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = new File([this], this.name, this);
  refs.set(this, cp);
  return cp;
};
// I don't know how to clone a FileList
FileList.prototype[myCopySym] = function(tryCopy, refs) {
  var cp = Object.create(FileList.prototype, {
    length: {
      value: this.length,
      writable: false
    },
    item: {
      value: function (i) {
        return this[i|0] || null;
      }
    }
  });
  refs.set(this, cp);
  for (var i = 0; i < this.length; i++) {
    cp[i] = tryCopy(this[i]);
  }
  return cp;
};

Array.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = [];
  refs.set(this, cp);
  for (var k in this) {
    cp[k] = tryCopy(this[k]);
  }
  return cp;
};

Object.prototype[myCopySym] = function (tryCopy, refs) {
  var cp = {};
  refs.set(this, cp);
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      cp[k] = tryCopy(this[k]);
    }
  }
  return cp;
};

function myCopy(obj) {
  var refs = new Map();
  function tryCopy(obj) {
    if (obj === null) return null;
    if (obj === void 7) return undefined;
    switch (typeof obj) {
      case 'boolean': case 'number': case 'string':
        return obj;
      case 'object':
        var ref = refs.get(obj);
        if (ref !== undefined) return ref;
        ref = obj[myCopySym](tryCopy, refs);
        return ref;
      default:
        throw TypeError('The object could not be cloned');
    }
  }
  return tryCopy(obj);
}
