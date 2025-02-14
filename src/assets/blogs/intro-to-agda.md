# What is Agda? A Beginner's Guide

By Zaine Qayyum

---


Agda is a dependently typed functional programming language and proof assistant. It is widely used in academia and research for writing verified programs and proving mathematical theorems. While it might seem intimidating at first, Agda is both powerful and rewarding once you get the hang of it. 
This was my chosen module for my Final Year as a Computer Science student, (module titled: *Advanced Functional Programming*), and so to reinforce my understanding I wanted to write a little about it.

## Why Agda?

Agda combines programming and theorem proving in a seamless way. Here are some of its features that stand out:

- **Dependent Types:** Agda allows types to depend on values, which means you can encode intricate properties of data directly into your types, ultimately making it easier to write correct programs.
- **Interactive Development:** Agda comes with an interactive environment that helps you construct proofs and debug code incrementally (emacs).
- **Strong Typing:** The type system in Agda catches many errors at compile time.
- **Extensibility:** Agda has support for Unicode characters and custom operators.

---

## Installing Agda

To start using Agda, you’ll need to install it. Here’s how:

1. **Install Haskell:** Since Agda is implemented in Haskell, you’ll need the Haskell Platform or GHC.
2. **Install Agda:** You can install Agda via `cabal` or `stack`. For example:

   ```bash
   cabal update
   cabal install Agda
   ```

3. **Install the Agda Standard Library:** Clone the Agda Standard Library from its [GitHub repository](https://github.com/agda/agda-stdlib) and include it in your project.

4. **Editor Support:** Agda works well with Emacs. Make sure you have the Agda mode installed and set up in your Emacs configuration.

---

## Writing Your First Agda Program

Let’s start with a simple example: defining natural numbers.

```agda
module Basics where

-- Define natural numbers
data Nat : Set where
  zero : Nat
  suc  : Nat -> Nat

-- Add two natural numbers
add : Nat -> Nat -> Nat
add zero     n = n
add (suc m) n = suc (add m n)

-- Example usage
example : Nat
example = add (suc (suc zero)) (suc zero)
```

### Explanation

1. **Module Declaration:** We start by defining a module named `Basics`. Think of it as a namespace.
2. **Natural Numbers:** We define `Nat`, a data type with two constructors:
   - `zero`: Represents 0.
   - `suc`: Represents the successor of a number (e.g., `suc zero` is 1, `suc (suc zero)` is 2).
3. **Addition:** The `add` function recursively adds two natural numbers.
4. **Example Usage:** We compute `2 + 1` and store the result in `example`.

---

## Dependent Types in Action
A dependant type is a type that depends on a value, and this is where Agda really shines. Let’s use dependent types to define vectors, which are lists with a fixed length.

```agda
module Vectors where

open import Data.Nat
open import Data.List

-- Define a vector
data Vec (A : Set) : Nat -> Set where
  []   : Vec A zero
  _::_ : {n : Nat} -> A -> Vec A n -> Vec A (suc n)

-- Append two vectors
append : {A : Set} {m n : Nat} -> Vec A m -> Vec A n -> Vec A (m + n)
append []       ys = ys
append (x :: xs) ys = x :: append xs ys

-- Example usage
exampleVec : Vec Nat 3
exampleVec = 1 :: 2 :: 3 :: []

exampleAppend : Vec Nat 5
exampleAppend = append exampleVec (4 :: 5 :: [])
```

### Explanation

1. **Vectors:** We define `Vec`, a type for vectors, parameterised by:
   - `A`: The type of elements in the vector.
   - `n`: The length of the vector.

   A vector of length 0 is represented by `[]`. A non-empty vector is constructed using `_::_`.

2. **Append Function:** The `append` function takes two vectors and produces a new vector whose length is the sum of the lengths of the input vectors.
3. **Example Usage:** We create a vector of length 3 and append it to another vector.

---

## Proving Properties

In Agda, you can write proofs just like programs. Let’s prove a simple property: adding zero to a number doesn’t change the number.

```agda
module Proofs where

open import Data.Nat

-- Proof: n + 0 = n
data _≡_ {A : Type} : A → A → Type where
 refl : (x : A) → x ≡ x

addZero : (n : Nat) -> add n zero ≡ n
addZero zero     = refl
addZero (suc n) = cong suc (addZero n)


```

### Explanation

1. **Equality:** The `≡` type represents equality in Agda. A value of type `x ≡ y` is a proof that `x` equals `y`.
2. **Base Case:** For `n = zero`, the proof is trivial (`refl` is a proof that any value equals itself, pronounced reflexivity).
3. **Inductive Step:** For `n = suc m`, we use `cong` to show that equality holds by induction.

---

## Interactive Development

Agda’s interactive features are a game changer. While working in Emacs, you can:

- **Type Check:** Use `C-c C-l` to load your file and check for errors.
- **Infer Types:** Place the cursor over an expression and press `C-c C-d` to see its type.
- **Fill in Holes:** Use `C-c C-space` to generate code snippets or suggestions for incomplete parts of your program.


---

## Challenges and Tips

Learning Agda can be challenging, especially if you’re new to dependent types or theorem proving. Here are some tips to make it easier:

- **Start Small:** Focus on simple programs and proofs before tackling complex ones.
- **Use the Standard Library:** The Agda Standard Library contains many useful definitions and functions.
- **Leverage the Community:** Join forums and mailing lists to ask questions and share knowledge.
- **Practice Regularly:** Like any skill, mastering Agda requires consistent practice.

---

## Conclusion

As with any programming language, it takes time to get used to the syntax and the nitty-gritties of the language itself- Agda is no exception. But once you start to write programs and proofs, you get more used to it, and you’ll find that it’s a powerful tool for solving complex problems.

