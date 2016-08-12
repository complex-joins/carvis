/* ======== REDIS SCHEMA =====
places:
---------
-- > nested datastructures not possible so solution:
hash name city && key: query, value: integer ID
++ SET name integer ID && content: objects of locations.

location object: {
  lat : int
  lng : int
  routable : string
}

===============================
userdata:
---------
hash name: user:<user id> (alexa userId)
keys:
---
lyftToken: string
lyftPaymentInfo: string
uberToken: string
originlat: int
originlng: int
originRoutable: string
phoneNumber: int
...

===============================

*/


var bluebird = require("bluebird");
bluebird.promisifyAll(require('redis')); // promisified versions have 'Async' postfix - ie. client.getAsync() and client.hgetallAsync()
var client = redis.createClient();

// this sets the Redis server as an LRU cache with 500MB space.
client.config("SET", "maxmemory", "500mb"); // should this be bigger ?
client.config("SET", "maxmemory-policy", "allkeys-lru");

// NOTE: what if the utterance string returned from alexa/client differs,
// but the place intended is the same ?

// NOTE: for each value on client side check validity of result before actions.

const redisPlaceLookup = (place, userId) => {
  client.hgetall(place, (err, res) => {
    if (err) {
      console.warn('err fetching from redis', err);
    } else {
      if (res) {
        if (res.userId) { // HGETALL returns an Object keyed by the hash keys.
          return res.userId;
        } else {
          let placeIndeces = res.getOwnPropertyNames();
          return res[placeIndeces[0]];
        }
      } else {
        let value = ''; // TODO: placescall to set value.
        client.hset(place, userId, value)
      }
    }
  });
};

// cache user data for in app use
// hashmap would be userId with value {key: val, key: val}
// could do findOrCreate http://redis.io/commands/hsetnx -- for other data?
const redisStoreData = (userId, key, value) => {
  client.hset(userId, key, value); // sets key:value to the userId hashmap
  // return callback ?
};

// NOTE: cb example: https://coligo.io/nodejs-api-redis-cache/
const redisSimpleFind = (userId, key) => { // pass a cb (such as res.send()) ?
  client.hgetall(userId, (err, res) => { // getAsync ?
    if (err) {
      console.warn('err fetching from redis', err);
    } else {
      if (res) {
        if (res.key) {
          return res.key;
        } else {
          // user exists, key doesn't. // error message ?
        }
      } else {
        // user does not exist -- DB lookup
        // if DB returns false for user, have them re-auth.
      }
    }
  });
};

// TODO: export
