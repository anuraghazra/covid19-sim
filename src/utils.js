
/** UTILS */
function rand(min, max) {
  return ((Math.pow(10, 14) * Math.random() * Math.random()) % (max - min + 1)) + min;
}
function random(min, max) {
  if (max === undefined) return Math.random() * min;
  return min + Math.random() * max
}
function randomInt(min, max) {
  return Math.floor(random(min, max));
}
function clamp(value, min, max) {
  if (value >= max) {
    return max;
  } else if (value <= min) {
    return min;
  }
  return value;
}

function dist(px, py, qx, qy) {
  let dx = px - qx;
  let dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
}
function distSq(px, py, qx, qy) {
  let dx = px - qx;
  let dy = py - qy;
  return (dx * dx + dy * dy);
}