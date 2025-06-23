---
layout: '@layouts/PostLayout.astro'
title: Extends never
description: Examines why keyof T extends never in TypeScript's DeepReadonly is problematic—it fails on union types. 
  Shows that mapped types handle primitives automatically, making the conditional check unnecessary and error-prone..
tags:
  - Typescript
  - Typesystem
---

When examining TypeScript utility types, you might encounter this implementation of `DeepReadonly`:

```ts
type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };
```

The `keyof T extends never` check might seem puzzling at first. Let's break down what it does and why it's problematic.

What Does `keyof T extends never` Actually Check?

The `never` type is **TypeScript's bottom type** — a type with no possible values. When we check `keyof T extends never`, we're asking: "Does the type `T` have zero known keys?"

Here's how it behaves with different types:

```ts
type HasNoKeys<T> = keyof T extends never ? true : false;

type Test1 = HasNoKeys<{ a: string }>           // false - has key "a"
type Test2 = HasNoKeys<{}>                      // true - empty object
type Test3 = HasNoKeys<object>                  // true - no specific keys
type Test4 = HasNoKeys<string>                  // false - has methods like "charAt"
type Test5 = HasNoKeys<{ a: string } | { b: string }> // true - no common keys!
```

The last example reveals the problem: union types with no common keys return `true` because `keyof` only returns keys that exist on *all* members of the union.

> [!important]
> `keyof` returns only the keys that exist on **all** members of an union

Why This Breaks DeepReadonly ?

This behavior causes `DeepReadonly` to fail on union types:

```ts
type DeepReadonly<T> = keyof T extends never ? T : { readonly [k in keyof T]: DeepReadonly<T[k]> };

type BrokenResult = DeepReadonly<{ a: string } | { b: string }>;
// Result: { a: string } | { b: string } - NOT readonly!

declare const obj: BrokenResult;
if ("a" in obj) {
    obj.a = ""; // No error! Should be readonly but isn't
}
```

Since the union has no common keys, `keyof T extends never` returns `true`, so we get the original type back without any `readonly` modifiers.

# The Right Way: Skip the Check Entirely

Mapped types already handle primitives correctly without explicit checks:

```ts
type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
```

Here's why this works:

1. **Primitives are preserved**: `{ readonly [K in keyof string]: ... }` just returns `string`
2. **Unions distribute automatically**: Mapped types process each union member separately
3. **No edge cases**: Works correctly for all input types

```ts
type TestMapped<T> = { [K in keyof T]: "transformed" };

type Result1 = TestMapped<{ a: string }>;        // { a: "transformed" }
type Result2 = TestMapped<string>;               // string (unchanged)
type Result3 = TestMapped<{ a: string } | { b: string }>; 
// { a: "transformed" } | { b: "transformed" }
```

## extends object

If you want to explicitly distinguish between objects and primitives, use `extends object`:

```ts
type DeepReadonly<T> = T extends object 
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> } 
    : T;
```

This works because:
- `extends object` creates a **distributive conditional type**
- Union types are automatically split, processed individually, then recombined
- More explicit about the object vs. primitive distinction

## Key Takeaways

1. **`keyof T extends never` is unreliable** - it fails on union types with no common keys
2. **Mapped types are self-limiting** - they naturally handle primitives without explicit checks
3. **Union distribution is automatic** - both mapped types and distributive conditionals handle unions correctly
4. **Simpler is better** - the version without any conditional check works best for `DeepReadonly`

The original `extends never` check was likely an attempt to create a base case for recursion, but TypeScript's type system handles the recursion termination automatically through mapped types.

# Resources
- [Stackoverflow - What is "extends never" used for](https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for)
