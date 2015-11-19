var webdriver = require('selenium-webdriver');
var phantomjs = require('phantomjs');

var driver = function() {
  var caps = webdriver.Capabilities.phantomjs();
  caps.caps_["phantomjs.binary.path"] = require('phantomjs').path
  return new webdriver.Builder()
    .withCapabilities(caps)
    .build()
}();

function World(callback) {
  this.webdriver = webdriver;
  this.browser = driver;
  this.browser.manage().addCookie("foo", "bar");
};

exports.World = World;
