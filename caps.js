// like brain.js file
// require files: driver, vendor, events
// manages the stage of shipment/delivery of products

const driver = require('./driver/driver.js');
const vendor = require('./vendor/vendor.js');
const event = require('./events.js');

const order = new vendor.Vendor();

function timestamp() {
  return new Date().toDateString();
}

event.on('pickup', driver.orderPickedUp);
event.on('in-transit', driver.orderDelivered);
event.on('delivered', vendor.deliveryComplete);

/*
  Documentation: I used the solution that Stack Overflow user Madera's Ghost posted on 10 Apr 2016 to help me write how to emit an event in a set interval https://stackoverflow.com/questions/36530438/events-in-nodejs-event-is-being-emitted-within-setinterval-but-not-without-se
*/

// emit a 'pickup' event every 5 seconds (5000 ms)
let createOrder = setInterval(() => {
  event.emit('pickup', {
    payload: order.create(),
    event: 'pickup',
    // without this property, the other asynchronous functions that follow wouldn't know when to run??
    time: timestamp(),
  });
  console.log(`STATUS: ready for pickup`);
}, 5000);

module.exports = {
  createOrder: createOrder,
}
