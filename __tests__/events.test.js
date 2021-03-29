'use strict';

const caps = require('../caps.js');

const driver = require('../driver/driver.js');

const faker = require('faker');

const vendor = require('../vendor/vendor.js');

const order = new vendor.Vendor();

function timestamp() {
  return new Date().toDateString();
}

let testPayload = {
  event: 'pickup',
  time: timestamp(),
  payload: {
    storeName: 'Garden Galore',
    customerName: faker.name.findName(),
    timeOfPurchase: timestamp(),
    shippingAddress: `${faker.address.streetAddress('###')}, ${faker.address.city()}, ${faker.address.stateAbbr} ${faker.address.zipCode('#####')}`,
    orderId: faker.datatype.uuid() 
  }
}

console.log = jest.fn();

describe('====== Communications Test ======', () => {
  it('vendor notifies driver that order is ready for pickup', () => {
    let test = caps.createOrder();

    expect(console.log).toHaveBeenCalled();
    clearInterval(test);
  });

  it('driver notifies vendor that order is in-transit', () => {
    driver.orderPickedUp(testPayload);
    expect(console.log).toHaveBeenCalled();
  });

  it('driver notifies vendor that order is delivered', () => {
    driver.orderDelivered(testPayload);
    expect(console.log).toHaveBeenCalled();
  });
});
