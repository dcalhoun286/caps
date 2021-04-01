'use strict';

const caps = require('../caps.js');
const driver = require('../driver/driver.js');
const vendor = require('../vendor/vendor.js');
const faker = require('faker');

function timestamp() {
  return new Date().toDateString();
}

describe('====== Communications Test ======', () => {

  let consoleSpy;

  let test = {
    time: timestamp(),
    event: 'pickup',
    payload: {
      storeName: 'Garden Galore',
      customerName: 'George Stewart',
      timeOfPurchase: timestamp(),
      shippingAddress: `85 `,
      orderId: faker.datatype.uuid()
    }
  }

  jest.useFakeTimers();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  })

  it('waits 5 seconds before creating an order', () => {

    caps.createOrder();
  
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

  it('vendor notifies driver that order is ready for pickup', () => {

    caps.createOrder();
   
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    


  });

  it('driver notifies vendor that order is in-transit', () => {

    driver.orderPickedUp(test);

    setTimeout(() => {

      expect(consoleSpy).toHaveBeenCalled();
    });

  });

  it('driver notifies vendor that order is delivered', () => {
    
    driver.orderDelivered(test);
    
    setTimeout(() => {

      expect(consoleSpy).toHaveBeenCalled();
    });
  
  });

  it('vendor thanks driver for making delivery', () => {

    vendor.deliveryComplete(test);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
