# Test doubles and Design for Testability

## Index
- [Unit Testing](#unit-testing)
- [System Testing](#system-testing)
- [Integration Testing](#integration-testing)
- [The Testing Pyramid](#the-testing-pyramid)
- [Google's Application of The Testing Triangle](#googles-application-of-the-testing-triangle)
- [Test Doubles](#test-doubles)
- [Test Doubles at Google](#test-doubles-at-google)
- [Design for Testability](#design-for-testability)

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

## Test Doubles
While unit testing is simpler than system testing, testing units that depend on other units can still be challenging. An
example could be a program with a central class that handles all SQL-related things. Any class that uses this class will
then be dependent on a database, which can make things more difficult. This is where **test doubles** come in. A test
double is an object that mimics the behavior of a component, this makes it possible to test a unit dependent on another
unit, where that other unit is completely controller. You can then test the actual implementation of that other unit
individually. The advantages of test doubles are:
- More control, you can tell the double exactly how to behave;
- Faster. You don't rely on API calls, database queries, etc.

There are a few different types of test doubles you can use while testing:

### Dummy Objects
Dummy Objects are objects that are never really used. For instance, when a `Customer` class takes an `Address` and
`Last Order` parameter in its constructor and you want to test the `Last Order` parameter, then you could pass a dummy
object as an `Address` - its data doesn't have to be meaningful, it just has to be present for a `Customer` to be
instantiated. 

### Fake Objects
Objects with working implementations of the class they simulate, but do the same task in a much simpler way (e.g. a fake
database that simply uses a List to store things).

### Stubs
Objects with hard-coded answers to calls, meaning they don't have a working implementation like fake objects do.

### Spies
An object that wraps around another object to be able to capture which calls were executed with what parameters, what
was returned, etc. It behaves exactly like the object it wraps but collects information you can use in the meantime.

### Mocks
Pre-configured stubs. You could for example tell a mock object to return `1` the first time a method is called. and `2`
the second time.

### Mockito
Mockito is a popular Java library for test doubles. You can read how it works in the
[book](https://sttp.site/chapters/pragmatic-testing/test-doubles.html).

### When you should mock
Generally you should mock/stub when
1. Dependencies are too slow;
2. Dependencies communicate with external sources;
3. Cases are hard to simulate.

On the other hand, you generally don't want to be mocking/stubbing
1. Entities that represent a database record - they're usually just fields without any logic;
2. Native libraries and utility methods.

The reason you don't mock native libraries and utility methods is that you can simply create abstractions of them, and
mock those.

More rules on mocking can be found in the [book](https://sttp.site/chapters/pragmatic-testing/test-doubles.html).

## Test Doubles at Google
*Software Engineering at Google* has an entire chapter on test doubles. This is a summary of that chapter:
- Using test doubles requires the system to be designed for testability, e.g. using abstractions on top of native
libraries with static methods, dependency injection, etc;
- Test doubles should behave to the original object as closely as possible;
- Prefer realism over isolation: when possible use the real implementation instead of test doubles;
- Execution time and determinism (whether certain inputs always yield the same output) should decide whether to mock;
- If real implementation can't be used, prefer fakes of mocks;
- Don't mock excessively; this can make tests hard to comprehend;
- Prefer state testing over interaction testing when mocking;
- Use interaction testing when state testing is not possible;
- Avoid overspecified interaction tests;
- Good interaction testing requires strict guidelines while designing the system.

## Design for Testability
Software systems are often not prepared to be tested, requiring a lot of refactoring before writing valuable tests.
Hence designing and building a software system in a way that increases testability is very valuable. This is called
**design for testability**, and specifically involves *dependency injection* and the separation between *domain-* and
*infrastructure code* in addition to some *implementation-level tips*.

### Dependency Injection
Dependency injection is quite simple. Instead of instantiating a class inside of a method, you take an instantiated
class as parameter. This allows you to provide a mocked version of a class instead of the actual implementation.

### Domain vs Infrastructure
Seperating domain and infrastructure is a good step towards designing for testability. The **domain** is the core of the
system, e.g. business rules, logic, entities, services, etc. The **infrastructure** is all code that handles
infrastructure like database queries, API calls, file reading and writing, etc. Typical infrastructure classes are DAOs.

Important concepts of this separation are ports and adapters. This is also called *hexagonal architecture*. Whenever
your domain needs infrastructure, you need your business logic to depend on *ports*. They are simply interfaces
represent what an infrastructure needs to do. They indicate what has to happen, but not how. How it's done is dependent
on the *adapter*. An advantage of this is that you can simply mock your ports when testing.

Isolating the domain from the infrastructure layer is called **Domain-Driver Design**. 

### Implementation-level Tips
These are some tips on designing for testability:
1. Make sure your classes are cohesive, i.e. make sure they do just one thing. This makes your classes easier to test as
usually this results in fewer dependencies, thus fewer mocks, etc.;
2. Try to keep the amount of dependencies low. Having fewer dependencies means having to mock fewer objects, increasing
testability. This can be done by combining certain conditions, e.g. by wrapping multiple into one;
3. Don't use overly-complex conditions. A very complex condition will make testing that condition harder. Instead, try
to spread the condition into smaller conditions to make it a bit easier to test. Note that this does not reduce the
overall complexity of the problem;
4. Don't test private methods. Simple private methods can usually be tested through the public methods that use the
private method, but to make testing easier complex private methods are better tested individually. However, consider
moving these complex private methods to their own class to decrease complexity;
5. Avoid creating static methods whenever possible. It is pretty difficult to test static methods, so prevent them.
Utility methods can be static as they're usually not tested anyway.
