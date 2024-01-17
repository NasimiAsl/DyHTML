
function def(a, d) {
  if (a != undefined && a != null) return (d != undefined && d != null ? a : true);
  else
    if (d != _null)
      return (d != undefined && d != null ? d : false);
  return null;
}


var always = function () { return true; };

function n_1(ar) {
  ar = def(ar, []);
  if (!def(ar.length)) return null;
  return ar[ar.length - 1];
}

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, '');
};

String.prototype.replaceAll = function (str1, str2, ignore) {
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
};

function join(ar1) {
  var ar3 = [];
  return _each(ar1, function (at, i) { _each(at, function (ati, j) { ar3.push(ati); }); }, function () { return ar3; });
}

var JsIden = 0;
/** run simple json or Javascript value */
function js(op, adr) {

  if (!def(op)) return null;
  try {

    var lines = op.split('\n');

    var funjs = "";
    for (var i in lines) {
      if (lines[i].indexOf('//') != -1) {
        funjs += lines[i].split('//')[0].trim();
      }
      else funjs += lines[i];
    }

    var r = window.eval(" r = " + funjs.replaceAll('\n', ' ').replaceAll('\r', ' ')); return r;
  } catch (e) {
    console.log('Error JS:', e.message, 'code :' + op, adr);


  }
}



function _for(ar, _do, e, b) {
  if (def(b)) b();

  if (!def(_do)) return ar;

  for (var i = 0; i < ar.length; i++) {
    _do(ar[i], i);
  }
  if (def(e)) return e();
}
function _for_r(ar, _do, e, b) {
  if (def(b)) b();
  for (var i = ar.length - 1; i >= 0; i--) {
    _do(ar[i], i);
  }
  if (def(e)) return e();
}


function parent(p, s) {
  p = def(p, document);

  if (!s) return p.parentNode;


  var rl = p.parentNode.querySelector(s);

  return rl;
}
function parent2(p, s) {
  p = def(p, document);

  if (!s) return p.parentNode.parentNode;


  var rl = p.parentNode.parentNode.querySelector(s);

  return rl;

}
function parent3(p, s) {
  p = def(p, document);

  if (!s) return p.parentNode.parentNode.parentNode;

  var rl = p.parentNode.parentNode.parentNode.querySelector(s);
  return rl;

}



function first(s, f, p) {
  p = def(p, document);
  var rl = p.querySelector(s);

  if (!def(f)) return rl;

  if (def(rl))
    f(rl);
}


function last(s, f, p) {
  p = def(p, document);
  var rl = p.querySelectorAll(s);


  if (!def(f)) return rl[rl.length - 1];
  if (rl.length > 0)
    f(rl[rl.length - 1]);
}


function all(s, f, e, b, p) {
  p = def(p, document);
  var rl = p.querySelectorAll(s);
  return _for(rl, f, e, b);
}



// math base 
var floor = Math.floor;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var atan = Math.atan;
var asin = Math.asin;
var acos = Math.acos;
var pow = function (x, y) { return Math.pow(x, (y ? y : 2.)); };
var ceil = Math.ceil;
var abs = Math.abs;
var exp = Math.exp;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var sqrt = Math.sqrt;

var random = Math.random;

var round = Math.round;
var sqrt = Math.sqrt;
var PI = Math.PI;
var E = Math.E;

var deg = PI / 180.;
var rad = 180. / PI;

var nextIndex = function (p, i) {
  var v = false;
  for (var j in p) {
    if (v) return j;
    if (j == i) {
      v = true;
    }
  }
  return undefined;
}




var sortIndex = function (p) {


  var ids = [];
  for (var i in p) ids.push(i);
  ids.sort();

  var m = [];
  for (var i in ids) {
    m[ids[i]] = p[ids[i]];
  }

  return m;
}


var firstIndex = function (p) {

  for (var j in p) {

    return j;

  }
  return undefined;
}

var lastIndex = function (p) {

  for (var j in p) {
  }
  return j;
}

var prevIndex = function (p, i) {
  var v = undefined;
  for (var j in p) {

    if (j == i) {
      return (v == 'index' ? undefined : v);
    }
    v = j;
  }
  return undefined;
}



var mix = function (a, b, n) {

  if (n)
    for (var bi in b)
      a[bi] = def(b[bi], def(a[bi], ''));

  else
    for (var bi in b)
      if (a[bi] != null && a[bi] != undefined) a[bi] = def(b[bi], def(a[bi], ''));

  return a;
};
const _null = 'always null value';

function cd(v) {
  return v
    .replace(/"/g, '_!gt_')
    .replace(/'/g, '_!tt_')
    .replace(/;/g, '_!sq_')
    .replace(/,/g, '_!co_')
    .replace(/{/g, '_!as_')
    .replace(/}/g, '_!ae_')
    .replaceAll('[', '_!bs_')
    .replace(/]/g, '_!be_')
    .replace(/`/g, '_!qq_')
    .replace(/=/g, '_!eq_')
    .replace(/:/g, '_!d2_')
    .replace(/\\/g, '_!sl_');
};
function dc(v) {
  return v
    .replace(/_!gt_/g, '"')
    .replace(/_!tt_/g, "'")
    .replace(/_!sq_/g, ';')
    .replace(/_!co_/g, ',')
    .replace(/_!as_/g, '{')
    .replace(/_!ae_/g, '}')
    .replace(/_!bs_/g, '[')
    .replace(/_!be_/g, ']')
    .replace(/_!qq_/g, '`')
    .replace(/_!eq_/g, '=')
    .replace(/_!d2_/g, ':')
    .replace(/_!sl_/g, '\\');

};

function typeKey(event, s, n) {


  switch (event.keyCode) {


    case 8: { s.pop(); }
    case 46: { s.pop(); }
    case 48: if (n % 2 == 0) s += '0'; break;
    case 49: if (n % 2 == 0) s += '1'; break;
    case 50: if (n % 2 == 0) s += '2'; break;
    case 51: if (n % 2 == 0) s += '3'; break;
    case 52: if (n % 2 == 0) s += '4'; break;
    case 53: if (n % 2 == 0) s += '5'; break;
    case 54: if (n % 2 == 0) s += '6'; break;
    case 55: if (n % 2 == 0) s += '7'; break;
    case 56: if (n % 2 == 0) s += '8'; break;
    case 57: if (n % 2 == 0) s += '9'; break;
    case 110: if (n % 2 == 0) s += '.'; break;

    case 96: if (n % 2 == 0) s += '0'; break;
    case 97: if (n % 2 == 0) s += '1'; break;
    case 98: if (n % 2 == 0) s += '2'; break;
    case 99: if (n % 2 == 0) s += '3'; break;
    case 100: if (n % 2 == 0) s += '4'; break;
    case 101: if (n % 2 == 0) s += '5'; break;
    case 102: if (n % 2 == 0) s += '6'; break;
    case 103: if (n % 2 == 0) s += '7'; break;
    case 104: if (n % 2 == 0) s += '8'; break;
    case 105: if (n % 2 == 0) s += '9'; break;

    case 65: if (t % 3 == 0) s += 'a'; break;
    case 66: if (t % 3 == 0) s += 'b'; break;
    case 67: if (t % 3 == 0) s += 'c'; break;
    case 68: if (t % 3 == 0) s += 'd'; break;
    case 69: if (t % 3 == 0) s += 'e'; break;
    case 70: if (t % 3 == 0) s += 'f'; break;
    case 71: if (t % 3 == 0) s += 'g'; break;
    case 72: if (t % 3 == 0) s += 'h'; break;
    case 73: if (t % 3 == 0) s += 'i'; break;
    case 74: if (t % 3 == 0) s += 'j'; break;
    case 75: if (t % 3 == 0) s += 'k'; break;
    case 76: if (t % 3 == 0) s += 'l'; break;
    case 77: if (t % 3 == 0) s += 'm'; break;
    case 78: if (t % 3 == 0) s += 'n'; break;
    case 79: if (t % 3 == 0) s += 'o'; break;
    case 80: if (t % 3 == 0) s += 'p'; break;
    case 81: if (t % 3 == 0) s += 'q'; break;
    case 82: if (t % 3 == 0) s += 'r'; break;
    case 83: if (t % 3 == 0) s += 's'; break;
    case 84: if (t % 3 == 0) s += 't'; break;
    case 85: if (t % 3 == 0) s += 'u'; break;
    case 86: if (t % 3 == 0) s += 'v'; break;
    case 87: if (t % 3 == 0) s += 'w'; break;
    case 88: if (t % 3 == 0) s += 'x'; break;
    case 89: if (t % 3 == 0) s += 'y'; break;
    case 90: if (t % 3 == 0) s += 'z'; break;
    case 190: if (t % 3 == 0 || t % 2 == 0) s += '.'; break;



  }
  return s;

}

function __len(p, p1) {
  p1 = def(p1, { x: 0, y: 0, z: 0 });
  return sqrt(pow(p.x - p1.x) + pow(p.y - p1.y) + pow(p.z - p1.z));
}

function __pnt(p, d, l) {
  return {
    x: p.x + d.x * l,
    y: p.y + d.y * l,
    z: p.z + d.z * l
  };
}
function __dir(p, p1, l) {
  return {
    x: (p.x - p1.x) / l,
    y: (p.y - p1.y) / l,
    z: (p.z - p1.z) / l
  };
}

var wind = function (op) {
  op = def(op, {});
  this.start = def(op.start, this.start);
  this.live = def(op.live, this.live);
  this.end = def(op.end, this.end);
  this.steps = def(op.steps, this.steps);
  this.fx = def(op.fx, this.fx);
  this.fun = def(op.fun, this.fun);
  this.interval = def(op.interval, this.interval);
  this.last = def(op.last, this.last);
};

wind.prototype = {
  start: 0,
  live: 0,
  end: 0,
  steps: 100,
  interval: 10,
  fx: function (x) {
    return x;
  },
  paused: true,
  last: function (v) { },
  fun: function (v) { },
  go: function (v) {

    var x = (this.end - this.start);
    var y = this.fx(this.live);
    this.start = this.start + x * y / this.steps;
    this.end = v;
    this.live = 0;
    if (this.paused) {

      this.request(this);
    }

  },
  request: function (th) {

    if (th.live + 1 > th.steps) {
      th.last(th.end);
      th.paused = true;
      th.live = 0;
      th.start = th.end;
    }
    else {
      th.paused = false;
      var x = (th.end - th.start);
      th.live++;
      var y = th.fx(th.live);
      y = x * y / th.steps;

      this.fun(th.start + y);

      setTimeout(function () { th.request(th); }, th.interval);
    }
  }
};

var v3 = {
  add: function (a, b,t) {
    return v3.tim({
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z
    },def(t,1));
  }, 
  avg: function (a, b ) {
    return v3.tim({
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z
    },0.5);
  },
  sub: function (a, b,t) {
    return v3.tim({
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z
    },def(t,1));
  },
  not: function (a) {
    return {
      x: -a.x,
      y: -a.y,
      z: -a.z
    };
  },
  len: function (a) {
    return pow(pow(a.x) + pow(a.y) + pow(a.z), 0.5);
  },
  nrm: function (a) {
    var l = v3.len(a);
    if (l == 0) return {
      x: 0,
      y: 0,
      z: 0
    };
    return {
      x: a.x / l,
      y: a.y / l,
      z: a.z / l
    };
  },
  div: function (a, b) {
    if (b.x)
      return {
        x: a.x / b.x,
        y: a.y / b.y,
        z: a.z / b.z
      };
    else return {
      x: a.x / b,
      y: a.y / b,
      z: a.z / b
    };
  },
  tim: function (a, b) {

    if (b.x)
      return {
        x: a.x * b.x,
        y: a.y * b.y,
        z: a.z * b.z
      };
    else return {
      x: a.x * b,
      y: a.y * b,
      z: a.z * b
    };
  },


}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16)/256,
    g: parseInt(result[2], 16)/256,
    b: parseInt(result[3], 16)/256
  } : null;
}

