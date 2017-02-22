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
  let top = this.arr[1];
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
