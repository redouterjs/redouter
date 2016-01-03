# redouter

Redouter is a library of functions that support an opinion of how universal web applications should be implemented using React, Redux and react-router.

This is essentially a work of original research, and as such it will remain versioned under 0.x until I determine that it works well enough in various scenarios.

## motivation

Much ado has been written and said about React, a view library that promotes unidirectional data flow (via Flux architecture) and provides a universal view rendering mechanism.

For all its merits, React is ultimately just a view library, which has led to a proliferation of potpourris of libraries to form a complete MVC framework.

One of the more popular combinations uses React, Redux and React Router. However, examples are few and, in my opinion, more complicated than they need to be.

I decided to approach the entire universal conundrum from a radically different angle, one which some might view as a step backwards - to implement dumb components almost universally and shift all universal logic server-side.

## trivia

I needed a word that represented the combination of all three libraries (react, redux and react-router) which 

1. didn't already exist
2. was easily recognizable as related to React

After mucking around with word combinations I discovered `redouter` is an actual word, a French word that means "to fear". Not the best repreesentation, but it will do for now. I don't have high hopes, but perhaps some day this will be a _redoubtable_ framework that powers universal applications.

## references

* [Writing NPM packages with ES6 using the Babel 6 CLI][1]
* [Writing Mocha Tests in ES6 with Babel 6][2]

[1]: http://jamesknelson.com/writing-npm-packages-with-es6-using-the-babel-6-cli/
[2]: http://www.jisaacks.com/writing-mocha-tests-in-es6-with-babel-6/