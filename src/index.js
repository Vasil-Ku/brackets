module.exports = function check(str, bracketsConfig) {
  let n = 0, m = 0, k = 0, eq = [], uneq = [], stuck = [];
  for (let i = 0; i < bracketsConfig.length; i++) {
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
      eq[n] = bracketsConfig[i];
      n++;
    }
    else {
      uneq[m] = bracketsConfig[i];
      m++;
    }
  }
  if (str === undefined || inUneq2(str[0],uneq)) return false;
  for (let i = 0; i < str.length; i++) {
    if (inUneq1(str[i],uneq)) {
      stuck[k] = str[i];
      k++;
    }
    if (inUneq2(str[i],uneq)) {
      if (stuck[k-1] === findOpen(str[i],uneq)) k--;
      else return false;
    }
    if (inEq(str[i],eq)) {
      if (stuck[k-1] === str[i]) k--;
      else {
        stuck[k] = str[i];
        k++;
      }
    }
  }
  if (k === 0) return true;
  else return false;
}

function inEq (a, s) {
  for (let i = 0; i < s.length; i++) {
    if (a === s[i][0]) return true;
  }
  return false;
}

function inUneq1 (a, s) {
  for (let i = 0; i < s.length; i++) {
    if (a === s[i][0]) return true;
  }
  return false;
}

function inUneq2 (a, s) {
  for (let i = 0; i < s.length; i++) {
    if (a === s[i][1]) return true;
  }
  return false;
}

function findOpen (a, s) {
  for (let i = 0; i < s.length; i++) {
    if (a === s[i][1]) return s[i][0];
  }
}