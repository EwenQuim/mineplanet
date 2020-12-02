# Mineplanet project

This is a prototype of a Minesweeper game realized in React Native using Expo.

## Running it locally

```
git clone https://github.com/EwenQuim/mineplanet
yarn start
```

This starts an Expo server.

- Be connected on the same local network (use your mobile data for example)
- Start your Expo app (or download it from your store)
  - the was tested on web browser & a physical android device but not an a real iPhone
- Scan the QR Code provided by expo
- Here you are 🎉

## Technical choices & implementation

I have made some choices. As every technical choice, they must be documented.

### OOP description

I used classes to represent the board and cells.

It is a very handy way to deal with complex infrastructures, and helps a lot having a clean code.

A nice way to code it to separate the _logical_ part of the _graphic_ part of an app, that's what I tried to do with these.

### TypeScript

TypeScript is better than JavaScript.

I share the same opinions as [this article](https://dzone.com/articles/what-is-typescript-and-why-use-it).

Moreover, TS articulates well with an object-oriented paradigm.

### Main structure

Every cell have their own press & longPress function as prop, which is redundant.
I could have avoided that by using **Redux**, but I haven't.

Redux allows to share a state between component.
This lib is very handy because it allows easy and automatic re-rendering for components sharing the state.

Why haven't I used Redux ?

- First, it might have been over-killed. It is a powerful feature that we simply do not _need_ here. We can do otherwise, and redux adds a bit of complexity for nothing, with all the store configuration. Sometimes it is wise not to use librairies just because they look good, but they do not add any value
- This is a test about React Native, not about any lib
- It's better to push React Native to its limits before using someone else's work

I might use Redux for a (local) leaderboard system I'll do later

## My experience doing this work

I am not a React Native Expert. In fact, I just started learning React Native for this test...

I hope I didn't do too bad, and even if my choices are wrong, at last you know why I made them. (and that's sometimes the most important).
