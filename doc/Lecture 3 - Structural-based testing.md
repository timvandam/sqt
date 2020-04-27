# Lecture 3 - Structural-based testing

## Index
- [Structural Testing](#structural-testing)
- [Why do we need structural testing?](#why-do-we-need-structural-testing)
- [Detailed explanations](#detailed-explanations)
- [Loop boundary adequacy](#loop-boundary-adequacy)
- [The effectiveness of structural testing](#the-effectiveness-of-structural-testing)

## Structural Testing
Structural testing techniques are techniques based on the source code of your programs, instead of just their
specifications. When applying structural testing one way of seeing how well your tests cover your code is using *coverage*.
Coverage is the % of source code your tests execute. There are different coverage criteria for coverage;
- Line coverage
- Block coverage
- Branch (or decision) coverage
- Condition (Basic & Condition+Branch) coverage
- Path coverage
- MC/DC coverage

#### Line coverage
Literally the % of lines your test executes. This can be quite misleading; two functions that do the exact same thing -
one of them in more lines than the other - both having the exact same untested line, will have a different line coverage.

#### Block coverage
Block coverage looks at the % of basic blocks covered. A basic block is a straight-line through your source code with no
branches. This means that for each if you encounter you will create a new basic block. A graph of basic blocks is called
a control-flow graph.

#### Branch coverage
With branch coverage you make sure all edges of a control-flow graph are tested, instead of just their blocks as is
done with block coverage. Branch coverage might not be enough; while every branch is tested, branches might depend on
multiple conditions which can behave in an unpredictable manner for some combinations.

#### Condition coverage
Condition coverage resolved the just mentioned issue. The control-flow graph for condition coverage will split each
condition into its own block, making sure all conditions are tested. This creates a bigger control-flow graph, creating
more test cases.

#### Path coverage
Condition coverage will not make sure that all paths are testing. Meaning that not all combinations of branches are
covered. This is exactly what path coverage does. However, it is quite expensive to do so; 3 if-blocks would require
2<sup>3</sup> = 8 tests. This number grows quickly for big methods.

#### MC/DC coverage
Coverage that is better than condition coverage but not as expensive as path coverage is also possible. This is done
using **Modifified Condition/Decision coverage**. Instead of covering all paths, you cover only the important ones.
MC/DC finds conditions which independently change the outcome, eliminating many quite useless tests you would need to
achieve 100% path coverage. Now you will need just `n + 1` tests (where n is the amount of conditions).

To summarize MC/DC: Each condition is once true, once false. Each action is taken at least once. Each condition should independently change
the outcome.

#### Strategy Subsumption
The before mentioned strategies depend on each other. If you have 100% X coverage, all coverage techniques below X will
will also yield a 100% coverage. The 'priority' list of coverage techniques is as follows:
1. Path coverage
2. MC/DC
3. Condition coverage
4. Branch coverage
5. Statement coverage

## Why do we need structural testing?
There are two main reasons:
1. To systematically derive test cases from source code.
2. To know when to stop testing.

## Detailed explanations
Detailed explanation of each of the before mentioned coverage techniques can be found in the
[book](https://sttp.site/chapters/testing-techniques/structural-testing.html). They include examples and stuff.

## Loop boundary adequacy
What do you do coverage wise when encountering loops? Given that exhaustive testing is impossible, we can't just test
loops with at X iterations, X + 1 iterations, etc. Instead, we rely on the **loop boundary adequacy** criteria to decide
when we are done testing a loop. The criteria are as follows:
- A test case exercises the loop 0 times;
- A test case exercises the loop once;
- A test case exercises the loop multiple times.

## The effectiveness of structural testing
Does test coverage *really* matter? There is no magical coverage % to aim for, but there is evidence that structural
testing has benefits. These quotes are mentioned in the book:
- Hutchins et al.: "Within the limited domain of our experiments, test sets achieving coverage levels over 90% usually
showed significantly better fault detection than randomly chosen test sets of the same size. In addition, significant
improvements in the effectiveness of coverage-based tests usually occurred as coverage increased from 90% to 100%.
However, the results also indicate that 100% code coverage alone is not a reliable indicator of the effectiveness of a
test set."
- Namin and Andrews: "Our experiments indicate that coverage is sometimes correlated with effectiveness when [test suite]
size is controlled for, and that using both size and coverage yields a more accurate prediction of effectiveness than
[test suite] size alone. This in turn suggests that both size and coverage are important to test suite effectiveness."
