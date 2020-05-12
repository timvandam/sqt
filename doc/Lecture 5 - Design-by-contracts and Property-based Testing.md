# Lecture 5 - Design-by-contracts and Property-based Testing

## Index
- [Self Testing](#self-testing)
- [Design by Contracts](#design-by-contracts)
- [Property-Based Testing](#property-based-testing)

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

Value comparisons are great when you know all possible outcomes for given inputs. Version comparisons are great when you
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
**{P} A {Q}**. If there are no pre-/postconditions you can simple set P and/or q to True.

For specifics into pre- and postconditions please look at the
[book](https://sttp.site/chapters/testing-techniques/design-by-contracts.html). It's too straight forward to warrant a
summary.

### Invariants
Invariants are quite different to pre- and postconditions; invariants should hold before *and* after a function call. A
special type of invariant in Object-Oriented Programming is the **class invariant**. Class invariants are invariants
that hold after class construction and before and after any call to a public method given that their preconditions hold.

You can check your class invariants in several ways; for example, you can have a private/protected method make
assertions, and then call that method before and after a public method call. You could also have a boolean method return
whether the invariant holds, and then assert on its return value before and after your public methods.

## Design by Contracts
When a server offers clients services through an API, the client and server are bound by a *contract* that describes how
the API should be used. Properly using the API (preconditions hold) yield valid results (postconditions hold). Designing
systems following such contracts is called *design by contracts*. Such design uses UML to model interfaces that are to be
implemented by the server, and used by the client. The following diagram taken from the book shows this:
<p align="center">
    <img src="https://sttp.site/chapters/testing-techniques/img/design-by-contracts/dbc_uml.svg" alt="UML Diagram">
</p>

### Subcontracting
Imagine that we use one interface to implement another. In this case the pre-/postconditions and invariants of both
interfaces will align somewhat. To indicate that one interface uses the same conditions as another, but less strictly,
you can use an apostrophe to indicate that a condition is *weaker* or *stronger*. This is done in the diagram above,
where the bottom interface inherits from the top interface. I' indicates that it is *stronger* than I, this makes sense
since the bottom interface will add functionality to the top interface, making extra checks needed. Since the
preconditions set by the top interface cannot be changed by the bottom interface, P' is just as strong as P. However,
generally speaker P' can also be weaker than P (when it adds extra constraints). Since P' can only become weaker, Q' can
only become stronger. Less preconditions create more possible outputs, thus there are more postconditions. 

In short:
- P' is **weaker** than P
- I' is **stronger** than I
- Q' is **stronger** than Q

### Liskov Substitution Principle
The LSP describes that every user of a class `T` should be able to use any of the subclasses of `T`. It's possible to
test whether your classes follow the LSP by creating test cases for `T`, and then executing these test cases on every
subclass. Since creating a duplicate test suite for every subclass of `T` is not ideal you should create a test suite for
just your superclass, and test additional features subclasses bring to the table in their own test suite that extends
the superclass's test suite. This way the hierarchical model of your classes will be the same as that of your tests.
One way you can do this is using abstract an abstract class with test cases and an abstract setUp function to set up
your test case for the specific subclass you're testing. This is called the *Factory Method*:

```java
// ListTest.java
public abstract class ListTest {

  private List list;

  protected abstract List createList();

  @BeforeEach
  public void setUp() {
    list = createList();
  }

  // Common List tests using list
}
```

```java
// ArrayListTest.java
public class ArrayListTest extends ListTest {

  @Override
  protected List createList() {
    return new ArrayList();
  }

  // Tests specific for the ArrayList
}
```

## Property-Based Testing
Property based testing does not only include assertions, you can also use properties to derive test cases. Since you will
be testing for properties that must always hold, it doesn't matter what your input is. Hence, you can use a generator to
generate many test cases instantaneously.

Some good examples and code samples can be found in the [book](https://sttp.site/chapters/testing-techniques/property-based-testing.html).

### Property-Based Testing + Ai
Using a whole lot of randomly generated input is not a very efficient way of testing, but making effective test cases
requires a lot of resources. Hence, a combination of the two is usually great. The effectivity of generated tests *can*
be improved though; Ai is perfect for this.

Artificial intelligence can be applied to generate meaningful data, that exercises important parts of your system. One
problem with this approach is that there is no easy way to know if the output is correct, as the input was generated.
That's where oracles come into play; checking for properties of the output is already a big step into verifying that
your system behaves correctly.
