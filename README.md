This repository demonstrates a problem when `stack-chain@0.9.1` (required by
`cucumber@0.9.1`) and `selenium-webdriver@2.48.2` interact. If you do
something dumb, Selenium raises an error that has had `Object.seal()` called
on it by Google's Closure Library. The result is a backtrace like this:

```
>npm test

> @ test /home/rlm/ws/cucumberjs-and-selenium-error
> cucumberjs

Feature: CucumberJS works with Selenim


  As a user
  I want to use CucumberJS and Selenium together
  So I can make better software

  Scenario: Developer does something nonsensical       # features/example.feature:7
    Given I've set a cookie in the World               # features/step_definitions/steps.js:6
    When I navigate to http://google.com               # features/step_definitions/steps.js:10
      TypeError: Cannot define property:callSite, object is not extensible.
          at Function.defineProperty (native)
          at Object.defineProperty.set (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/cucumber/node_modules/stack-chain/stack-chain.js:195:12)
          at Function.prepareStackTrace (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/cucumber/node_modules/stack-chain/stack-chain.js:141:20)
          at promise.Promise.goog.defineClass.resolve_ (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/selenium-webdriver/lib/goog/../webdriver/promise.js:1128:38)
          at eval (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/selenium-webdriver/lib/goog/../webdriver/promise.js:1059:14)
          at reject (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/selenium-webdriver/lib/goog/../webdriver/promise.js:1400:7)
          at eval (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/selenium-webdriver/lib/goog/../webdriver/promise.js:2708:36)
          at Array.forEach (native)
          at promise.ControlFlow.goog.defineClass.goog.defineClass.abort_.error.interrupts_.forEach [as abort_] (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/selenium-webdriver/lib/goog/../webdriver/promise.js:2708:19)
          at promise.ControlFlow.goog.defineClass.goog.defineClass.abort_.error.executeNext_.processUnhandledRejections_ (/home/rlm/ws/cucumberjs-and-selenium-error/node_modules/selenium-webdriver/lib/goog/../webdriver/promise.js:2808:12)
    Then I should see a useful error in my stack trace # features/step_definitions/steps.js:14

Failing scenarios:
features/example.feature:7 # Scenario: Developer does something nonsensical

1 scenario (1 failed)
3 steps (1 failed, 1 skipped, 1 passed)
0m00.231s
npm ERR! Test failed.  See above for more details.
```

Looking at the trace above, how would you know that the source of the error is
the following code from line 15 of `features/support/world.js`?

```
  this.browser.manage().addCookie("foo", "bar");
```

