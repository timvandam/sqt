# Lecture 5 - Design-by-contracts and Property-based Testing

## Index
- [Self Testing](#self-testing)

## Self Testing
Self testing is pretty much a system that tests itself. This means moving assertions from test suites into actual
production code. The system can then check whether everything is in order while it's running. Self testing can be a
great addition to test suites.

### Assertions
Self testing is done using assertions. Unlike `JUnit` assertions, these come with Java. Assertions will either do
nothing, when the condition holds, or throw an `AssertionError`, when the condition is doesn't hold. `AssertionErrors` can
however be turned off by the Java runtime, in fact you have to manually enable them using `java -ea`.

Assertions can act like **oracles**, which inform us whether a test has passed or failed. Examples of oracles are
*value comparisons*, *version comparisons*, and *property checks*. Assertions are generally property checks.

Value comparions are great when you know all possible outcomes for given inputs. Version comparisons are great when you
don't know all possible outcomes, but do have an older/other version of code that you know works which you can then use
as oracle. Property checks are checks on the output to check whether certain expected properties hold.

Look at this self testing stack:
```java
public class MyStack {
  public Element pop() {
    // Descriptions are optional, but very helpful whilst debugging!
    assert count() > 0 : "The stack does not have any elements to pop."

    // ... actual method body ...

    assert count() == oldCount - 1 : "Size of stack did not decrease by one";
  }
}
```

In this case the first assertion is the **precondition**, and the second one is the **postconditions**. They ensure
valid behavior before and after the execution of a method. In other words: preconditions check whether the input is
correct, postconditions check whether the output is correct. Note that postconditions only have to hold when the
preconditions hold. A third form of assertions is **invariants**, which are used to check object health (e.g. ensuring
the state behaves as expected).

Assertions can be used to guide test cases;
- Test inputs should reach assertions;
- When assertions contain disjunctions, all alternatives should be triggered;
- Assertions may contain boundaries.

Since assertions are checks based on a system's specification, they are a form of black box testing. Assertions can be
replaced by functionality to *weaker* preconditions, making for a more complex system. Weaker preconditions increase the
tolerance of a method (can handle more situations), but can also cause more outputs, creating more postconditions.

Assertions are used to ensure that the system behaves according to specification, so unlike you do with test suites, you
do **not** test for undefined behavior (what happens when receiving invalid input, etc).

### Hoare Triples
A Hoare Triple is a set of 1. Preconditions; 2. A Program *A*; 3. Postconditions. A Hoare Triple can be expressed as
*{P} A {Q}*. If there are no pre-/postconditions you can simple set P and/or q to True.

For specifics into pre- and postconditions please look at the
[book](https://sttp.site/chapters/testing-techniques/design-by-contracts.html). It's too straight forward to warrant a
summary.

Stopped reading at Invariants; continue tmrw
