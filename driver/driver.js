'use strict';

const event = require('../events.js');

function timestamp() {
  return new Date().toDateString();
}

// Documentation: MDN docs -- timeouts and intervals https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals

// wait one second before running this code
function orderPickedUp(payload) {
  setTimeout(() => {
    payload.time = timestamp();
    payload.event = 'pickup';
    console.log(`STATUS: ${payload.event}`);
    console.log(`DRIVER: picked up ${payload.payload.orderId}`); 
    event.emit('in-transit', payload);
  }, 1000);
}

function orderDelivered(payload) {

  function testFunction() {
    console.log('TEST -- in-transit event working properly');
  }

  // wait 3 seconds after 'in-transit' event is emitted to run this
  setTimeout(() => {
    testFunction();
  }, 3000);
}

module.exports = {
  orderPickedUp,
  orderDelivered
}