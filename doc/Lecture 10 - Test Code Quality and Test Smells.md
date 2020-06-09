# Test Code Quality and Test Smells
Once you make one mistake, or forget to refactor while testing, the amount of test code you write and maintain can get
quite significant. Test code bases tend to grow quickly. In order to still be able to manage your tests you need to make
sure they are concise and understandable; generally put high-quality. As Lehman's law of evolution states: code tends to
rot unless one actively works against it.

## Index
- [The FIRST Properties](#the-first-properties)
- [Test Desiderata](#test-desiderata)
- [Test Code Smells](#test-code-smells)

## The FIRST Properties
The authors of *Pragmatic Unit Testing* discuss the *FIRST Properties of Good Tests*. FIRST is an acryonym for *fast*,
*isolated*, *repeatable*, *self-validating*, and *timely*

- Fast;
    - Good tests are fast. Developers won't have to wait long for feedback, and won't try running the tests less because
    they are so slow;
    - Improving test speed can be done with mocks/stubs, refactoring of production code, or by moving slower tests to a
    new test suite that you might run less often.
- Isolated;
    - Test cases should be concise in what they actually test. It is ideal to test an atomic unit like just one method
    in your tests, instead of multiple. **Fat/eager tests** - tests for multiple functionalities - should be avoided as
    they can be complex in terms of implementation and readability;
    - Tests should also not depend on other tests to run. This means that test-suite level mocks should not use chaining
    like this example in jest, as some calls to the mock would not be made unless all tests run:
    ```js
    mockFn.mockImplementationOnce((a) => 2 * a)
        .mockReturnValueOnce(17)
        .mockReturnValue(9)
    ```
    This also means that test cases should **not** be responsible for setting up a test environment, and should leave no
    trace after having run.
- Repeatable;
    - Your tests should give the same result no matter how many times is runs. Developers won't trust flaky tests, so if
    this is not upheld your tests are pretty much worthless;
    - Common causes are: external dependencies, concurrency issues, not waiting long enough for an external resource.
- Self-validating;
    - Tests should assert results themselves. This seems obvious, but developers sometimes forget to assert in their
    tests, causing them to pass every time;
    - If it's not possible to easily assert the result, refactor your production code!
- Timely.
    - Developers should be *test infected*; they should write and run tests as often as possible. Faster feedback causes
    a faster response, reducing cost (both money and mental health... who wants to test everything at the end o_o?).

## Test Desiderata
This is yet another list of properties that good tests have. There's twelve of them:
- Isolated - tests should return the same result regardless of the order they are run in;
- Composable - tests should give the same result no matter how many times they are run, given they are isolated;
- Fast - test should run fast;
- Inspiring - passing tests should give confidence in your production code, so no flaky tests;
- Writable - tests should be cheap to write when comparing it to the code under test;
- Readable - tests should be easy to read and easy to understand why they were needed;
- Behavioral - tests should be sensitive to changes in the behavior of the code under test;
- Structure-insensitive - tests should not change their result when the structure of the code changes;
- Automated - no need for human intervention/interaction while testing;
- Specific - if a test fails, it should be obvious what caused it;
- Deterministic - if nothing changes, the test result should not change;
- Predictive - if the tests all pass, the code should be suitable for production.

## Test Code Smells
*Code smell* is a well-known term that indicates possible symptoms that might indicate deeper problems in the source
code. Some examples are *Long Method*, *Long Class*, and *God Class*.

### Code Duplication
When you have similar test cases you might be tempted to simply copy paste and change some stuff. Instead, you should
write parameterized tests. Duplicated code might reduce the productivity of testers, as one small change could force you
to have to make another change in *all* of the duplicated code, which increases the likelihood that you forget to make
this change in one of tests. So refactor your test code whenever it is needed!

### Assertion Roulette
To understand a test you have to understand its assertions. Test smell can emerge when it's hard to understand what
is actually being asserted or why those assertions might be failing. This can for instance happen when testing for some
complex business rules that thus also require complex assertions. In these cases you should write complex assert methods
that abstract away part of the complexity of the assertion code itself. Comments are also a great step.

While many people advocate for having just one assertion per test, this is often not the best strategy; it limits your
ability to test which can cause more test smell. Minimising the amount of assertions per smell can have great effects,
though, as long as you ensure that you are only testing one test case per test.

### Resource Optimism
Resource optimism happens when your test assumes that some resource is ready the moment it executes, while this is often
not the case. An example could be that you instantly query a database, without knowing whether its state is already
correct. This means that the test is responsible for setting up the state itself. This might seem contradictory to what
I said before, but it is not, as hooks like `@BeforeEach` can be considered part of your test.

Another case of test smell in the form of resource optimism can happen when your test assumes a resource is available at
all times. You might ensure that your database runs before you run your tests, but you can never be sure that an
external webservice is online as it is completely out of your control.

To avoid this test smell you generally want to avoid using external resources within your test by utilizing stubs and
mocks. If this is not possible for some reason you should make your test suite skip that test when the service is
unavailable. This seems weird to do, but you need to be able to trust your test suite, and when your tests become flaky
you will lose that trust. You should of course also ensure that the environment you run your test in is set up with the
needed resources, such as databases. Generally you would use a CI tool for this.

### Test Run War
You want to make sure your tests can successfully run regardless of how many times that test running in parallel. An
example where this is not the case is when using a centralized database in your tests; if two people were to run
all tests at the same time, they would both be modifying resources causing tests to fail. Isolation is key in this case:
you want to make sure to either mock/stub or to set up a local environment.

### General Fixture
A fixture is the set of input values used to exercise the component under test. Fixtures are set up in advance while
creating your tests. As your components under test become more complex, your fixtures become more complex or increase in
amount as you want one for each partition. To make the situation worse, while all test cases are different, fixtures
might overlap. Given this possibility, you might be tempted to create a large fixture that works for many tests which
each test will then use a small part of. While this might work, this is hard to maintain. Once a test fails and you try
to comprehend what happened, you will have to overlook parts of the fixture you don't even need. This costs time and can
confuse you.

Making sure that the fixture of a test is specific makes the test more easy to comprehend, and will make any issues
easier to solve. Build patterns can help you solve this type of smell.

### Indirect Tests & Eager Tests
Tests should be cohesive and focused, making sure tests for specific functionalities are easy to find, and that they
actually only test one of such functionality. This means that classes under test that inherit other classes, should not
be testing any methods of the superclass, etc. Smell emerges when you focus on too many tests at once, hence stubs and
mocks can also be an important aspect of preventing this smell.

Tests should test a single unit. If they depend on other classes you could use stubs and mocks, ensuring that your test
is isolated, and thus not an indirect test. When this is not possible you want to make sure you are only asserting the
functionality of the class under test, and when something does fail due to a dependency, it is clear that this is the
case.

Similarly, you want to avoid eager tests, in which you are exercising more than some unique behavior of a component.
This ensures that your tests stay concise, thus cohesive. 

### Sensitive Equality
Good assertions are fundamental while testing. A bad assertion can cause failures where no actual failure occurred. It
may seem easy to create a good assertion, but it is not always that easy. Especially when components produce outputs
that tend to change often. Test code should be as resilient as possible, so assertions should not be too harsh on the
actual implementation, as long as the result is right.

This means that methods like `.toString` should absolutely not be used to assert whether a computation was correct, as
there is no reason why you should not be able to change that method whenever you want; it should be for displaying
purposes only. In other terms, with `.toString` you are checking for overall behavior as it generally displays that.
You should not be checked that, instead you should be checking whether the output matches what you were expecting.
Additionally, `.toString` might contain data not related at all to your method under test, so why even assert it when
there is unnecessary data in there?

### Inappropriate Assertions
The quality of your test relies heavily on the quality of its assertion(s). Your assertions are one of the main tools
developers might use when determining what the cause of a failure was. Say that you want to compare something, instead
of calling `assertTrue(a.equals(b))` you should be calling `assertEquals`. This way you will receive a very clear
message indicating which value you expected and which value you received if your assertion were to raise an error.

### Mystery Guest
Integration tests almost always rely on external dependencies. While they are often unavoidable for any functional
application, making them explicit in your tests will help developers cope with them. When you use such dependencies, or
guests, without properly indicating you are doing so, it might make it hard for the developer what happened in case of
fails. I.e., mystery guests are hard to find.

One way of making guests explicit is by providing proper error messages when such a guest exhibits unexpected behavior.
You can do this by simply asserting that behavior. 
