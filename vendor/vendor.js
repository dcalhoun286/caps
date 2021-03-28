'use strict';

const faker = require('faker');
const event = require('../events.js');

// Documentation for Date obj: https://stackoverflow.com/questions/30158574/how-to-convert-result-from-date-now-to-yyyy-mm-dd-hhmmss-ffff

function timestamp() {
  return new Date().toDateString();
}

class Vendor {
  constructor() {
    this.storeName = 'Gardening Galore';
    this.orders = [];
  }

  // Note to self: I need to remember to ask if the name of this method here matters for CRUD purposes when this becomes the real thing. My hunch says it does matter
  create() {
    let productOrder = {
      storeName: this.storeName,
      customerName: faker.name.findName(),
      timeOfPurchase: timestamp(),
      shippingAddress: `${faker.address.streetAddress('###')}, ${faker.address.city()}, ${faker.address.stateAbbr} ${faker.address.zipCode('#####')}`,
      orderId: faker.random.uuid()
    }

    // push into fake db to keep track of order statuses until they need to be deleted
    this.orders.push(productOrder);

    // need this object to talk to caps.js file? Or confirm for testing purposes? Might delete because if it's stored in memory to the fake db I might not need to actually return the obj I created to terminate this class method
    return productOrder;
  }
}

function deliveryComplete(payload) {

  payload.event = 'delivered';
  console.log(`${Vendor.storeName}: Thank you for completing your delivery!`);
}

module.exports = {
  Vendor: Vendor,
  deliveryComplete: deliveryComplete,
}
