---
layout: '@layouts/PostLayout.astro'
title: Type Equality in Typescript
description: TypeScript's simple mutual assignability approach to type equality fails in several edge cases 
  including union distribution and special types. The robust solution uses a function signature comparison trick 
  that leverages structural type checking for precise type identity comparison.RetryClaude can make mistakes. 
  Please double-check responses.
date: "2025-06-01"
author: Moamen Hredeen
tags:
  - Typescript
  - Typesystem
---

Comparing types in TypeScript isn't as straightforward as it might seem. While the language provides powerful type checking, determining if two types are exactly equal requires understanding some subtle edge cases and advanced techniques.

## The Naive Approach

The most obvious way to check type equality is using mutual assignability:

```typescript
type IsEqual<T, U> = T extends U ? U extends T ? true : false : false
```

This works by checking if `T` can be assigned to `U` and vice versa. If both directions work, the types should be equal, right?

Unfortunately, this approach has several critical flaws.

## Problem 1: Union Type Distribution

Conditional types distribute over union types when the type parameter appears "naked" in the extends clause:

```typescript
type IsEqual<T, U> = T extends U ? U extends T ? true : false : false

type Test1 = IsEqual<'a' | 'b', 'a' | 'b'>  // Expected: true, Got: boolean
type Test2 = IsEqual<'a' | 'b', 'a'>        // Expected: false, Got: boolean  
type Test3 = IsEqual<'a', 'a' | 'b'>        // Expected: false, Got: boolean
```

When `T = 'a' | 'b'`, TypeScript distributes the conditional type:

```typescript
// This becomes:
('a' extends U ? U extends 'a' ? true : false : false) | 
('b' extends U ? U extends 'b' ? true : false : false)
```

The result is a union of `true` and `false`, which simplifies to `boolean` instead of the definitive answer we want.

### Solution: Prevent Distribution

Wrap type parameters in tuples to prevent distribution:

```typescript
type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false

type Test1 = IsEqual<'a' | 'b', 'a' | 'b'>  // ✅ true
type Test2 = IsEqual<'a' | 'b', 'a'>        // ✅ false
type Test3 = IsEqual<'a', 'a' | 'b'>        // ✅ false
```

This fixes the distribution problem, but there are still many other edge cases that make the simple approach unreliable.

## Problem 2: Special Types (`any`, `never`, `unknown`)

The simple extends-based approach fails with TypeScript's special types:

```typescript
type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false

// 'any' is both assignable to everything AND everything is assignable to it
type Test1 = IsEqual<any, string>     // true ❌ (should be false)
type Test2 = IsEqual<string, any>     // true ❌ (should be false)

// 'never' extends all types  
type Test3 = IsEqual<never, string>   // true ❌ (should be false)
type Test4 = IsEqual<string, never>   // false ✅
```

## Problem 3: Object Type Normalization

TypeScript internally normalizes intersection types, leading to inconsistent results:

```typescript
type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false

type A = { a: 1 } & { b: 2 }  // Intersection
type B = { a: 1; b: 2 }       // Object literal

type Test = IsEqual<A, B>  // Inconsistent - depends on internal normalization timing
```

## Problem 4: Readonly and Optional Property Differences

```typescript
type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false

// Readonly differences
type Test1 = IsEqual<{ readonly a: string }, { a: string }>  // false ✅

// Optional vs undefined union  
type Test2 = IsEqual<{ a?: number }, { a: number | undefined }>  // false ✅

// But assignability works in one direction:
// { readonly a: string } extends { a: string } = true
// { a: string } extends { readonly a: string } = false
```

## Problem 5: Function Overload Order

```typescript
type IsEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : false : false

type A = {
  (x: string): number;
  (x: number): string;
}

type B = {
  (x: number): string;  // Different order!
  (x: string): number;
}

type Test = IsEqual<A, B>  // false - overload order matters
```

## The Robust Solution: Function Signature Trick

The most reliable approach uses a clever function signature comparison:

```typescript
type IsEqual<T, U> = 
  (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) 
    ? true 
    : false
```

### How It Works

This technique leverages TypeScript's function type comparison rules:

1. **Identity Encoding**: Each function signature `<G>() => G extends T ? 1 : 2` encodes the "identity" of type `T`
2. **Structural Comparison**: TypeScript compares these function types structurally
3. **Generic Substitution**: The comparison checks if the functions behave identically for all possible generic parameter `G`

The key insight is that two function signatures are only assignable if they produce the same results for all possible inputs. This only happens when `T` and `U` are exactly identical types.

### Why This Works Better

The function signature approach handles all the edge cases more reliably because:

1. **No assignability bias**: It doesn't rely on TypeScript's assignability rules (which have special cases for `any`, `never`, etc.)
2. **Structural precision**: Function type checking is more precise about internal type representations
3. **Generic probing**: The `G` parameter acts as a "probe" that tests both types uniformly across all possible substitutions
4. **Normalization awareness**: TypeScript normalizes types before comparing function signatures

### Testing the Solution

```typescript
type IsEqual<T, U> = 
  (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) 
    ? true 
    : false

// Union types
type Test1 = IsEqual<'a' | 'b', 'a' | 'b'>     // ✅ true
type Test2 = IsEqual<'a' | 'b', 'a'>           // ✅ false

// Special types
type Test3 = IsEqual<any, string>              // ✅ false
type Test4 = IsEqual<never, string>            // ✅ false

// Object types  
type Test5 = IsEqual<{a: 1}, {a: 1}>           // ✅ true
type Test6 = IsEqual<{a: 1}, {a: 1, b?: never}> // ✅ false

// Intersection vs object (after normalization)
type Test7 = IsEqual<{a: 1} & {b: 2}, {a: 1, b: 2}> // ✅ true

// Readonly differences
type Test8 = IsEqual<{readonly a: string}, {a: string}> // ✅ false
```

## Conclusion

Type equality in TypeScript requires more than simple assignability checks. The function signature trick provides the most robust solution by leveraging TypeScript's structural type comparison in a way that truly tests type identity rather than just compatibility.

This pattern is used in many popular TypeScript utility libraries and testing frameworks where precise type equality matters.hat only happens when T and U are exactly the same.
