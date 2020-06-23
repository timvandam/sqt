# Lecture 2 - Specification-based testing and boundary testing

## Index
- [Specification-based testing](#specification-based-testing)
- [Boundary testing](#boundary-testing)

## Specification-based testing
Specification-based testing uses the requirements of the program as input for testing. This type of testing disregard
any internals; you only test whether partitions of the program work. Neglecting the internals when testing is also called
**black-box testing**.

### Partitioning the input space
Since it is almost always impossible to test your program in one go, it's important to split it up in to different
*partitions*. This can for instance be done by creating additional packages or classes. By doing this you are not only
partitioning your program, but also your tests. All partitions of your test suite should excersise a different part of
your program.

### Equivalence partitioning
As just mentioned, each partition of your tests exercises your program in a different way. When all inputs of this
partition will yield your program to do the same thing, this method of partitioning test cases is called
**equivalence partitioning**. Because all possible test cases in an equivalence partition will yield the same behavior,
you will only have to test one test case in per partition. Concrete examples can be found in the
[book](https://sttp.site/chapters/testing-techniques/specification-based-testing.html).
The leap year example shows how both the code and tests are partitioned. In the code each branch will create a new
partition that is subsequently testing in the test suite.

### Category-partition method
A systematic manner of deriving test cases is the **category-partition method**. The steps of this method are as follows:
1. Identify parameters/input.
2. Derive the characteristics/prerequisites of each parameter (e.g. `int year` is a positive integer).
3. Add constraints to minimize the test suite.
    - Find out what combination of parameters is invalid
    - If a corner case can be tested by just one set of parameters, do it with just that set
4. Generate sets of parameters and implement your test cases with them.

The [book](https://sttp.site/chapters/testing-techniques/specification-based-testing.html) contains a good example of the
application of this progress (Christmas discount).

### Random testing vs specification-based testing
Random testing is a popular *black-box* technique, but although it can be helpful in finding bugs, it is definitely not
an effective way of doing so. Combining random testing with the tests developers make (like mentioned before) is great,
though. This way you can have specialized tests that can tackle bug-prone areas, while at the same time generating
millions of test cases automatically. This is a great compromise between bug-catching efficiency and time efficiency.

## Boundary testing
Boundary testing is important to make sure your test cases still work when they are near the boundary of their
partition. Not doing any boundary testing could cause hard to find bugs which only appear when the inputs are just right.

### Boundaries in between classes/partitions
A boundary between classes/partitions can be found by finding a pair of consecutive input values which both belong to
different partitions. You can test these inputs to ensure your implementation does not have off-by-one errors such as
using `>` instead of `>=`.

### On and off points
There are a few important terms when talking about boundaries:
- **On points** are values that are exactly on the boundary of partitions. This would be a value that is in the
implementation you're testing.
- **Off points** are values that are closest to the boundary, without being on it. Off points should yield a value
nonequivalent to its respective on points.
- **In points** are all points that make the condition `true`.
- **Out points** are all points that make the condition `false`.

### Boundaries that are not explicit
This paragraph was just an example; read it [here](https://sttp.site/chapters/testing-techniques/boundary-testing.html).

### Automating boundary testing with JUnit (via Parameterized Tests)
JUnit allows you to create **parameterized tests**. These are re-usable tests; you implement it once, and then give it
inputs to try. This Java snippet shows how it works pretty well:
```java
@ParameterizedTest(name = "small={0}, big={1}, total={2}, result={3}")
@CsvSource({
  // The total is higher than the amount of small and big bars.
  "1,1,5,0", "1,1,6,1", "1,1,7,-1", "1,1,8,-1",
  // No need for small bars.
  "4,0,10,-1", "4,1,10,-1", "5,2,10,0", "5,3,10,0",
  // Need for big and small bars.
  "0,3,17,-1", "1,3,17,-1", "2,3,17,2", "3,3,17,2",
  "0,3,12,-1", "1,3,12,-1", "2,3,12,2", "3,3,12,2",
  // Only small bars.
  "4,2,3,3", "3,2,3,3", "2,2,3,-1", "1,2,3,-1"
})
void boundaries(int small, int big, int total, int expectedResult) {
    int result = new ChocolateBars().calculate(small, big, total);
    Assertions.assertEquals(expectedResult, result);
}
```
To make this code a bit cleaner, it's also possible to provide a method that returns a `Stream<Arguments>`. To do that,
insteadof `@CsvSource({ ... })` you use `@MethodSource("yourMethodName")`.

All of the book's tests for the chocolate thing can be found
[here](https://github.com/sttp-book/code-examples/tree/master/src/test/java/tudelft/chocolate).

## The CORRECT way
The authors of the book *Pragmatic Unit Testing in Java 8 with JUnit* explained something called the CORRECT way. It's
an acronym meaning the following:

[I can't be arsed to type it all, so just read it in the book](https://sttp.site/chapters/testing-techniques/boundary-testing.html)
