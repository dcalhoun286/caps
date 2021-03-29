'use strict';

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
  }, 1000);
}

module.exports = {
  orderPickedUp,
}