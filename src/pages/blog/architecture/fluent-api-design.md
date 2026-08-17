---
layout: '@layouts/PostLayout.astro'
title: Fluent API Design
description: Good APIs guide their users through a well-lit path, resulting in clearer code, fewer mistakes and better maintainability
date: "2025-06-23"
author: Moamen Hredeen
tags:
  - API
  - SystemDesign
  - SoftwareArchitecture
  - REST
  - Java
---

Good APIs guide their users through a well-lit path, resulting in clearer code,
fewer mistakes and better maintainability

# What are Fluent APIs

> In software engineering, a fluent interface is an object-oriented API whose
> design relies extensively on method chaining. Its goal is to increase code
> legibility by creating a domain-specific language (DSL). The term was coined
> in 2005 by Eric Evans and Martin Fowler.
>
> -- <cite>wikipedia</cite>

> A **Cascading** API is designed to **allow** operations to be expressed via an
> unbroken sequence of chained method calls, which can be split over multiple
> statements. A **Fluent** API is a cascading API designed to **always** be
> expressed in a single statement
>
> -- <cite>David Beaumont</cite>

# Why ?

why do we care about expressing something in a single statement ? what are the
**benefits** of using Fluent APIs ?

- Fluent APIs are domain specific languages, which gives the code semantic
  meaning, making it easier to tackle the complexity of a domain
- Declarative: a fluent API describes what to do and not how to do it, which hides
  most of the implementation details and makes the code self explanatory

> A well designed fluent API makes domain-specific operations more
> understandable & maintainable.
>
> -- <cite>David Beaumont</cite>

# Designing Fluent APIs

## Type Uniformity

whether or not to return the same type at each point of the chain

### Homogeneous APIs

uses a single type, which is useful for order-independent parameters

```java caption="A homogeneous API: call order does not matter"
var lineSplitter =  Splitter.on(',')
    .trimResults()
    .limit(4)


var lineSplitter =  Splitter.on(',')
    .limit(4)
    .trimResults()
```

### Heterogeneous APIs

uses different return types. They guide the user through a series of distinct
steps. They can express more complex operations and reuse common sub-APIs

```java caption="A heterogeneous API guides the user through typed steps"
assertThat(multiMap)            // -> MultimapSubject
    .valuesForKey(testKey)      // -> IterableSubject
    .contains(testValues)       // -> Orderd
    .inOrder();
```

## Fallibility

Fallible APIs need to let the caller know what happens when an operation fails.
There may be multiple methods for different cases.

Example for a Fallible API is the Guava `ImmutableMap` builder, which has a
`build` method, that can throw a runtime exception if you insert the same key
multiple times.

```java caption="Guava's ImmutableMap builder, which can throw on duplicate keys"
ImmutableMap.builder()
    .putAll(firstMap)
    .putAll(secondMap)
    .build()
```

there is no way to tell from this code, that the build method can throw an
exception, which can be confusing. Fluent API (or APIs in general) should hide
implementation details, but it should be explicit or unsuprising.

Later in the version `31` two new methods were added the API of `ImmutableMap`:

- `buildOrThrow`
- `buildKeepingLast`

which makes it very clear, that building an `ImmutableMap` can throw an
exception

## Mutability

whether or not the API mutates the same object. **Mutable** APIs are usually
homogeneous, and often reflect the classic **builder pattern**.[^builder]

```java caption="A mutable builder: every call mutates the same object"
new StringBuilder()
    .append(key)
    .append("=")
    .append(value)
    .toString();
```

**Immutable** APIs are harder to misuse, but allocate intermediate instances,
which can be costly.

```java caption="An immutable API allocates a new instance on each call"
for var line : lines {
    doSomethingWith(Splitter
        .on(',')
        .limit(4)
        .trimResults()
        .splitToList(line));
}
```

> Tip: when using **Immutable** APIs, caching intermediate results, that is used
> repeatedly is effective, and allows semantic naming

```java caption="Caching an immutable intermediate for reuse"
var CSV_SPLITTER =  Splitter
        .on(',')
        .limit(4)
        .trimResults();

for var line : lines {
    doSomethingWith(CSV_SPLITTER.splitToList(line));
}
```

## Optional Parameters

a valid no-op value to bypass the action of the method

## Comparison

Table: Five well-known builder-style APIs rated across the design dimensions discussed above.

|              | Fluency       | Type Uniformity | Fallibility | Reusability | Mutability    |
| ------------ | ------------- | --------------- | ----------- | ----------- | ------------- |
| ImmutableMap | Cascading     | Homogeneous     | Fallible    | Reusable    | Mutable       |
| Streams      | Cascading     | Heterogeneous   | Infallible  | One-Shot    | It Depends... |
| Splitter     | Cascading     | Homogeneous     | Infallible  | Reusable    | Immutable     |
| Flogger      | It Depends... | Homogeneous     | Infallible  | One-Shot    | Mutable       |
| Truth        | Fluent        | Heterogeneous   | Infallible  | One-Shot    | Immutable     |

## Tips & Tricks

- think hard about method naming
- consider parameter scope and method ordering carefully
- put required parameters in required methods
- let the problem domain inform choices like return type, mutability etc.
- be consistent

# Resources

- [Principles of Fluent API Design by David Beaumont](https://www.youtube.com/watch?v=VPu-ytfYTeU)
- [How to Create a Fluent API in C#](https://mitesh1612.github.io/blog/2021/08/11/how-to-design-fluent-api)

[^builder]: The builder pattern is one of the creational patterns from the Gang of Four's *Design Patterns* (1994); it separates the construction of a complex object from its representation so the same steps can build different results.
