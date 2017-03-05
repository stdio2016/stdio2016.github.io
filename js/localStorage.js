if (self.window) {
  // in main thread
  var worker = new Worker('js/localStorage.js');
  var primes = [];
  var logMilestone = 0;
  var a = 0;
  worker.onmessage = function(e) {
    primes = e.data;
    logMilestone++;
    if (logMilestone == 1000) {
      logMilestone = 0;
      console.log(++a);
    }
  };
  function getItem(key, callback) {
    worker.postMessage(['get', key, callback]);
  }
  function setItem(key, value) {
    worker.postMessage(['set', key, value]);
  }
  function incrItem(key, value) {
    worker.postMessage(['incr', key, value]);
  }
}
else {
  // in worker thread
  var idb = indexedDB;
  var dbNames = idb.open('dbNames', 1);
  dbNames.onupgradeneeded = function (event) {
    var db = event.target.result;
    var dbNamesTable = db.createObjectStore('dbNames', {keyPath: 'name'});
  };
  dbNames.onsuccess = function (event) {
    dbNames = event.target.result;
    var table = dbNames.transaction(['dbNames'], 'readwrite').objectStore('dbNames');
    var req = table.get('localStorage');
    req.onsuccess = function (evt) {
      if (req.result) return;
      var req2 = table.add({name: 'localStorage'});
      req2.onsuccess = function() {
        console.log('added localStorage');
      };
    };
    console.log('opened dbNames');
  };

  var localStorage = idb.open('localStorage', 1);
  localStorage.onupgradeneeded = function (event) {
    var db = event.target.result;
    var dbNamesTable = db.createObjectStore('storage', {keyPath: 'key'});
  };
  localStorage.onsuccess = function (event) {
    localStorage = event.target.result;
    console.log('opened localStorage');
  };

  function getItem (key) {
    var table = localStorage.transaction(['storage'], 'readonly').objectStore('storage');
    var req = table.get(key);
    return new Promise(function(resolve, reject) {
      req.onsuccess = function (evt) {
        if (typeof req.result === 'undefined') {
          resolve(null);
        }
        else {
          resolve(req.result.value);
        }
      };
    });
  }
  function setItem (key, value) {
    var table = localStorage.transaction(['storage'], 'readwrite').objectStore('storage');
    var req = table.put({key: key, value: value});
  }
  function incrItem (key, incr) {
    var table = localStorage.transaction(['storage'], 'readwrite').objectStore('storage');
    var req = table.get(key);
    req.onsuccess = function (evt) {
      if (typeof req.result === 'undefined') {
        var req2 = table.put({key: key, value: incr});
      }
      else {
        var req2 = table.put({key: key, value: req.result.value + incr});
      }
    };
  }
  function onmessage(e) {
    let msg = e.data;
    if (msg[0] === 'get') {
      getItem(msg[1]).then(function (result) {
        postMessage(result);
      });
    }
    if (msg[0] === 'set') {
      setItem(msg[1], msg[2]);
    }
    if (msg[0] === 'incr') {
      incrItem(msg[1], msg[2]);
    }
  }
}
console.log(self + '');
