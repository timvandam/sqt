# Lecture 1 - Introduction to Software Testing

## Index
- [Why software testing?](#why-software-testing)
- [Principles of software testing](#principles-of-software-testing)
- [Software testing automation](#software-testing-automation)
- [Tests and refactoring](#tests-and-refactoring)

## Why software testing?
Why test? Because bugs are everywhere, and they *can* have a major effect on our lives.

## Principles of software testing
It is important to establish some vocabulary to make sure we all understand each other when talking about testing.
Some important terms are **failure**, **fault**, and **error**.

### Failure, Fault and Error
#### Failure
A component of a system that does not function as expected.
Think of for example a news homepage displaying yesterday's news instead of today's.

#### Fault
Also called a **bug** or **defect**. A fault is the technical mistake in the system that can cause a failure.
An example could be incorrectly using `>` instead of `>=` in your code.
Note that a fault does not necessarily cause a failure; the faulty code might never not be evaluated,
making it seem as if it is not there.

#### Error
Also called a **mistake**. An error is the human action that can cause a failure.
In the context of software engineering it could be not thinking of edge cases when implementing a method.

### Verification and Validation
#### Validation
Validation is checking whether what you're implementing is useful,
or whether it is what your customer intended you to implement.

#### Verification
Verification is checking whether what you've implemented actually works. This is the main focus of this course.

### Why software testing is so hard
A simplistic view of software testing is that if you want a well tested system,
that you should write tons of tests for it. Unfortunately testing is not that simple.

It is indeed important to have the right amount of tests, however you should not expect to test every possible case.
In a system with 100 options to configure that would lead to 2<sup>100</sup> individual tests. Good luck with that...
Testing every case is called **exhaustive testing**.

Bugs are not **uniformly distributed**; some parts of your system might contain more bugs than others.

Implementing tests will show you the presence of bugs, not the lack thereof.

#### The pesticide paradox
The pesticide paradox shows that every method you use to find or prevent bugs will leave a residue of smaller, subtler
bugs on which those methods don't work. This shows that it's important to do more than just unit testing - you should
also implement integration tests, end-to-end tests, etc.

Note that testing is context-dependent. Test cases will differ between web applications and software that will power a
rocket.

#### The absence-of-errors fallacy
The absence-of-errors fallacy describes that a lack of bugs is not equivalent to great software - this once again shows
that verification &ne; validation.

## Software testing automation
Testing can be easily automated using testing frameworks. Examples are `JUnit` (for Java) and `Jest` (for Javascript).
Testing frameworks allow you to confirm that your code does what you intend it to do. You can verify that your code
returns the right thing using **assertions**. Examples in `JUnit` are *assertTrue*, *assertEquals*, *assertFalse*.
Examples in `Jest` are *toBe*, *toThrow*, *toBeFalsy*.

Testing frameworks generally also allow you to manipulate your testing environment using methdos that will run before
or after each/all tests. In `JUnit` this is done with annotations (`@BeforeAll`, `@BeforeEach`, `@AfterAll`, `@AfterEach`).

An example that uses `Jest` can be found [here](/src/roman).

## Tests and refactoring
A common occurrence while working on a project with others is *refactoring*. The importance of implementing automated
tests is shown when refactoring. After refactoring some code you will have to re-test your newly refactored code.
Implementing automated tests will prevent you from having to do the same manual tests multiple times. This not only
saves resources but also reduces the chance of you mistakenly marking something as working when it actually doesn't.

Advantages of automated testing includes:
- Automated test suites are less prone to obvious mistakes.
- Automated test suites are completed way faster than manual testing.
- Automated test suites bring confidence during refactoring.
