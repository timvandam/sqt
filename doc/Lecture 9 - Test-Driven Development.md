# Test-Driven Development
Test Driven Development means implementing while writing tests, and using those tests to guide yourself. It not only
helps you find the correct implementation, but also helps you properly structure your code.

## Index
- [The TDD Cycle](#the-tdd-cycle)
- [Advantages of TDD](#advantages-of-tdd)
- [All in on TDD?](#all-in-on-tdd)

## The TDD Cycle
So far, testing has always involved implementing some method, testing, and fixing stuff. A big disadvantage of this
approach is that you will receive feedback late in the process, making mistakes a bit more costly. TDD can help you
avoid this. TDD is development according to *the test-driven development cycle*. The cycle goes as follows:
1. Write a test (that will fail at this point);
2. Implement what is being tested s.t. the test passes;
3. Refactor your code/tests and repeat.

This incremental approach makes your tests nicer too! Generally you want to start writing a test for some simple input,
and once the test for that input passes, head to the next input your code should be able to handle. Since you write your
test before making a certain input work with your method, the test will likely fail. Once it eventually passes, it's
time to refactor your code and tests, as just making your tests pass neglects the quality of your production code. Once
your requirements have been met you can stop testing your code.

## Advantages of TDD
There are several advantages to TDD:
1. Creating tests first means you won't implement too much or not enough;
2. It is easier to control the pace at which production code is made - you can make smaller tests if you're not sure how
to implement something, and build on top of that - or you can write many/big tests because you know the implementation
will be a breeze;
3. Tests are based on the requirements, so when tests pass we know the code works like it's supposed to;
4. Your code will be testable from the start - no need for additional refactoring for testability;
5. Quick feedback on the code that you're writing;
6. Small steps/iterations - has many advantages;
7. Design feedback - since your code has to be testable from the get go, you will more consistently split code into
classes, etc.

## All in on TDD?
While there is of course no perfect answer to whether you should always be doing TDD, given all its
advantages there is no doubt that it has value.

The book suggests you should use TDD when you don't know how to design a certain part of the system. TDD will help you
explore different design choices.

TDD is always a good choice when dealing with complex problems due to its iterative nature. If you know exactly what a
problem is about, though, TDD is not really needed as there is nothing to be learned or explored. Note that it is
recommended to still write timely tests, though - quick feedback is always great!

[200 videos of someone creating a real-world app using TDD](https://www.youtube.com/playlist?list=PL0CCC6BD6AFF097B1)
