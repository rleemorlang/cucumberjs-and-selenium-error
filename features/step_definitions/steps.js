var World = require("../support/world").World;

module.exports = function() {
  this.World = World;

  this.Given(/^I've set a cookie in the World$/, function () {
    // Nothing to do here.
  });

  this.When(/^I navigate to http:\/\/google\.com$/, function () {
    return this.browser.get("http://google.com");
  });

  this.Then(/^I should see a useful error in my stack trace$/, function (callback) {
    // I don't know an easy way to test this, actually. Hopefully
    // you get the point.
    callback.pending();
  });
}
