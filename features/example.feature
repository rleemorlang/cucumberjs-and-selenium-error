Feature: CucumberJS works with Selenim

  As a user
  I want to use CucumberJS and Selenium together
  So I can make better software

  Scenario: Developer does something nonsensical
    Given I've set a cookie in the World
    When I navigate to http://google.com
    Then I should see a useful error in my stack trace 
