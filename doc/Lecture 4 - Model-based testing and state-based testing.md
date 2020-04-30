# Lecture 4 - Model-based testing and state-based testing

## Index
- [Models](#models)
- [Decision Tables](#decision-tables)
- [State Machines](#state-machines)

## Models
In software testing a model is a simple way to describe a program being tested. Models holds some of the attributes the
program being tested has, which makes it suitable for testing. Models give us a structured way of understanding how a
program should, or does operate. Models can usually be derived from system requirements (or user stories when working
in a Scum-like manner), these models are usually meaningful to experts on what ever is being implemented. Models can
also be derived from code (reverse engineering). In these cases the model will reflect what is in the current codebase.

## Decision Tables
One type of model is a decision table. Decision tables can be used whenever combinations of inputs determine a system's
behavior. An example could be a Swapfiets membership, where the monthly fee is determined by the type of bike, whether
you want a basket, etc.

Decision tables contain conditions and actions. Combinations of conditions will yield different actions. The Swapfiets
example looks like this:

| | |Variants| | |
|---|---|:---:|:---:|:---:|
|*Conditions*|Electric|F|F|T|
| |Basket|F|T|dc|
|*Action*|Price/Month|&euro;13.50|&euro;18.50|&euro;25.-|

This decision table contains a `dc`; a don't-care. These can be used for conditions that don't influence the outcome.
In the case above a basket can be included for free if you choose an Electric bike. If you choose an Omafiets it will
cost an additional &euro;5.- each month. Don't-cares can be used to represent a set of combinations of conditions in just one column.

Decision tables will generally contain 2<sup>n</sup> variants, where n is the amount of conditions. When using don't-cares
this number drops (as seen above). There is also another way for the amount of variants to be smaller: when using a
**default behavior**. This can be achieved by creating a default action - an action which any combination of conditions
which is not present in the decision table will yield.

### Testing decision tables
We can derive test cases from decision tables in order to test every combination of conditions. There are multiple ways
of going about this:
- **All explicit values** - derive a test case for each column under variants.
- **All possible variants** - derive a test case for each possible (implicit) variant (2<sup>n</sup> test cases). This is
often unrealistic as it is exhaustive.
- **Every unique outcome** - one unique test case for each unique action
- **Each condition T/F** - make sure that each condition is both T and F at least once in a test suite. This often yield two
test cases: everything T, everything F.

It's also possible to apply **MC/DC** testing on decision tables. This is a combination of the last two test deriviation
methods. In addition to those conditions, in each test case *one* condition should individually determine the respective
action. This makes for a test suite of `n + 1` test cases, where `n` equals the amount of conditions. This can be
achieved by expanding the decision table and combining two variant columns such that just one condition is different and
that each action is covered.

Once again MC/DC ensures good coverage at a low price.

### Implementing automated test cases for decision tables
The [book](https://sttp.site/chapters/testing-techniques/model-based-testing.html) contains an example where test cases
are implemented using decision tables. It also illustrates how valuable *parameterized tests* are when using decision
tables, as you will be testing the same thing. just with different inputs.

### Non-binary choices and final guidelines
It is also possible for decision tables to have non-binary choices. Take the Swapfiets example from earlier: what if a
third bike gets introduced (the Bierfiets)? In those cases you can simple put a non-binary value in your table.

The amount of variants will now be c<sub>0</sub> &times; c<sub>1</sub> &times; ... &times;
c<sub>n</sub>, with c<sub>k</sub> being the amount of choices for condition `k`. 

Having non-binary choices will make testing a whole lot more expensive, so it is generally not a great approach. An
alternative is *pair-wise combinatorial testing*, which you can google yourself.

Some general guidelines to keep in mind while designing decision tables:
1. **Keep conditions independent.** The order of the conditions should not matter, otherwise a state machine might be
more fitting.
2. **Use DC values when possible.** This decreases the amount of variants, making the decision table easier to read and
easier to understand.
3. **Variants with DC values should not overlap.** If they do, they should at least have the same action.
4. **Add a default column.** This provides an action for the variants that are not in the decision table, allowing the
decision table to not include all possible variants.
5. **Consider non-boolean conditions if conditions are mutually exclusive.** Mutually exclusive means that the
conditions can never be true at the same time. These conditions then probably encode a single non-boolean condition.
6. **If most conditions are non-boolean, consider using a different combinatorial testing technique instead.** One
example would be pair-wise testing.

## State Machines
A state machine is a model describing a system by its states. Systems often have multiple possible states and various
transitions between these states, these are used by state machines to model the system's behavior while it is running. 

State machines start with an initial state, and has events which trigger transitions into a different state. State
machines can be constructed using UML (Unified Modeling Language).
The [book](https://sttp.site/chapters/testing-techniques/model-based-testing.html) shows the specific syntax that can be
used for state machines.

Transitions can be *conditional*, meaning transitions will only occur when some condition is met at the time that the
respective event is fired. The syntax for conditional transitions is `<Event> [<Condition>]`Events can also be paired with actions, used to change certain values (e.g. values to use in
conditional transitions). The syntax for event-actions is `<Event> / <Action>`. Combining conditional transitions with
actions creates the following syntax: `<Event> [<Condition>] / <Action>`.

The [book](https://sttp.site/chapters/testing-techniques/model-based-testing.html) demonstrates these principles nicely
using an initially locked phone with automatic blocking after 3 failed log-in attempts.

### Testing state machines
When testing state machines it's important to look at a few things:
- Transitions into the wrong state
- Conditions of conditional transitions
- Actions of transitions
- Whether a state exhibits the same behavior at any time (to prevent history sensitivity)

There are a few different test coverages:
- **State coverage** - each state has to be reached at least once.
- **Transition coverage** - each transition has to be used at least once.

*Paths* through state machines can be used to derive test cases. For state coverage, you can create a path through your
whole model, and after each transition assert that you are in the right state and whether the actions that were supposed
to happen did in fact happen. For transition coverage you should figure out a way to reach all transitions at least once.
In some cases it's possible to do both at the same time (as in using the same test cases). 

### Paths and Transition trees
Besides singular transitions, sequences of consecutive transitions called **paths** can also be tested. It is generally
not possible to test all paths of a state machine as cycles within state machines would lead to an infinite amount of
paths to test. Nevertheless, paths are very useful for deriving test cases.

The idea is for each cycle within a state machine to be executed just once. This way a finite number of paths will be
tested. Since most state machines have cycles, it is generally not possible to achieve full **path coverage**. These
tests can be derived using a transition tree, which spans the graph of the state machine. Creating such a transition
works as follows:
1. Create a root node that is the initial state.
2. Add the siblings of the current node to the tree.
3. If no new siblings were added, stop. Else loop back to 2.

Each leaf of a transition tree represents a path through the state machine, thus it also represents a test case.

### Sneak paths and transition tables
Transition trees consider all cycles (and dead-end routes), however they do not check whether a transition exists that
should actually not exists. Paths that should not exist are called *sneak paths*. Sneak paths can be detected using
*transition tables*. A transition table is a table containing each transition in a state machine. The transition is
given by the source state, and the destination state. A transition table is constructed as follows:
1. List all the state machine's states along the rows;
2. List all events along the columns;
3. For each transition in the state machine, note its destination state in the correct cell.

An example from the book of a phone that can be turned off, locked and unlocked:

|States|Events| | | | |
|---|:---:|:---:|:---:|:---:|:---:|
| |home|wrong password|correct password|lock button|long lock button|
|OFF|LOCKED| | | | |
|LOCKED| |LOCKED|UNLOCKED| |OFF|
|UNLOCKED| | | |LOCKED|OFF|

With such a table it is easy to visualize all transitions, allowing you to quickly determine if there are any missing
transitions or transitions that shouldn't exist. To test for sneak paths you can create a test for each empty cell
in your transition table.

### Super states and regions
