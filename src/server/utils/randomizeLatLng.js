/** credit: https://gist.github.com/mkhatib/5641004

NOTE: not 100% accurate, and doesn't account of course for non-valid locations such as in the middle of water-bodies etc.

to increase validity one can look at:
http://stackoverflow.com/questions/31192451/generate-random-geo-coordinates-within-specific-radius-from-seed-point
https://www.npmjs.com/package/haversine

* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
function generateRandomPoints(center, radius, count) {
  var points = [];
  for (var i = 0; i < count; i++) {
    points.push(generateRandomPoint(center, radius));
  }
  return points;
}

/**
 * Generates number of random geolocation points given a center and a radius.
 * Reference URL: http://goo.gl/KWcPE.
 * @param  {Object} center A JS object with lat and lng attributes.
 * @param  {number} radius Radius in meters.
 * @return {Object} The generated random points as JS object with lat and lng attributes.
 */

function generateRandomPoint(center, radius) {
  var x0 = center.lng;
  var y0 = center.lat;
  // Convert Radius from meters to degrees.
  var rd = radius / 111300;

  var u = Math.random();
  var v = Math.random();

  var w = rd * Math.sqrt(u);
  var t = 2 * Math.PI * v;
  var x = w * Math.cos(t);
  var y = w * Math.sin(t);

  var xp = x / Math.cos(y0);

  var alt = Math.random() * 70 + 10; // plausible SF altitude.

  // Resulting point.
  return { 'lat': y + y0, 'lng': xp + x0, 'alt': alt };
}

module.exports = {
  generateRandomPoints: generateRandomPoints, // generates array of points.
  generateRandomPoint: generateRandomPoint // generates single point.
}
