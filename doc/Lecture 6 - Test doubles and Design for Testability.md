# Test doubles and Design for Testability

## Index
- [Unit Testing](#unit-testing)
- [System Testing](#system-testing)
- [Integration Testing](#integration-testing)
- [The Testing Pyramid](#the-testing-pyramid)
- [Google's Application of The Testing Triangle](#googles-application-of-the-testing-triangle)

So far only tests for individual components of a system have been discussed (unit tests), however, there exist many more
**testing levels**.

## Unit Testing
Unit testing is testing a purposefully testing just one single feature of your software, ignoring all other components
it might have. Defining a unit in your software is very dependent on the context; it might be a class, but could also be
just one method.

#### Advantages
- Unit tests are fast;
- Unit tests are easy to control/modify;
- Unit tests are easy to write.

#### Disadvantages
- Unit tests are not realistic - components don't live in isolation;
- Bugs that only occur when a unit is not isolated are not caught.

## System Testing
Unit tests don't exercise your whole system, system testing does. It is as simple as running the entire software system,
including databases, front-end apps, and all other components it might have. This is a form of **black box testing**.
You are testing whether some input yields some output, no matter how many units are involved in computing this output.

#### Advantages
- Tests are realistic;
- The user's perspective is captured.

#### Disadvantages
- Slower than unit tests as resources are generally pulled (API, database, etc);
- Harder to write, databases will require a mock set up, etc.;
- System tests can be flaky, meaning it will pass or fail depending on some configuration.

## Integration Testing
Unit testing and system testing are two extremes - you either test very small parts of your software, or all parts
combined. A more balanced approach is integration testing, where you test parts of your software in a less isolated
manner without having to exercise your entire system.

An example of something you would want to test using integration tests would be a DAO (Data Access Object) that executes
complex queries. You wouldn't want to test these in complete isolation, because you want to verify that your query's
result matches what you were expecting. Running your entire system just to test one DAO, however, is also a bit extreme.

The general goal is te test multiple components of a system together, focusing on the interactions between them instead
of the system as a whole. So they are not just unit tests with bigger units - it's very much about the interaction
between these units.

#### Advantages
- Combinations of components are tested, making this more thorough unit/system tests;
- Easier to write than system tests.

#### Disadvantages
- More integration causes more difficulty writing test suites (mocking database, etc.);
- Not as fast as unit tests (not as slow as system tests).

## The Testing Pyramid
An important question to ask yourself while testing is how much you should test per test level. Creating too many system
tests is too expensive, but only focusing on unit tests won't ensure that your software is bug-free. While there is no
perfect answer for this, the following diagram, called *the testing pyramid*, can help you make decisions:

<p align="center">
    <img src="https://sttp.site/chapters/pragmatic-testing/img/testing-pyramid/testing_pyramid.svg">
</p>

Generally the size of each partition shows how much of such testing you should do. Unit tests are cheap, so do a lot of
them; integration are a bit more expensive, so do a bit less. Manual testing is very expensive, so don't overdo it!

The next question you might ask yourself is which component should be tested with which testing type? Once again there
is no perfect answer, as every system is different from another. There are some general guidelines to help us, though.

### When to write unit tests
When the component is about an algorithm, or a single piece of business logic.

### When to write integration tests
Whenever the component under test interacts with external an external component like a database, web service, etc.

### When to write system tests
Testing the entire is too expensive to be implemented, so you should only system test the most critical components.
One example could be your payment processing - you don't want to charge client 5 times if they reload five times, but
you also don't want to let your customers purchase something without paying.

### When to perform manual tests
While manual testing is very expensive, it is sometimes impossible to avoid. In some cases it's even helpful. Make sure
it's actually is useful before applying it though; you don't want your tests to have a cone pattern (an upside-down
testing triangle).

Although the testing triangle can often be helpful, it's not perfect. It can't be used in every situation; a water
management station, for instance, won't have much use for many unit tests as much of its software will interact with
things outside of the source code (like water).

## Google's Application of The Testing Triangle
Google uses mostly unit tests (~80%) as they're cheap and performant. Additionally, they define test sizes which are
also taken in account when designing test cases:
- Small tests are tests that can be executed in a single process;
- Medium tests can span multiple processes, use threads and make external calls (database, network, etc.) as long as
they're on localhost;
- Large tests remove the localhost restriction. Google reserves these for full e2e tests. 
