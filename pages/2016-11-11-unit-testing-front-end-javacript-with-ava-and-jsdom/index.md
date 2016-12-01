---
title: Unit testing front-end JavaScript with AVA and jsdom
description: Writing tests for JavaScript code that interacts with the DOM can be tricky. Luckily, using a combination of AVA and jsdom, writing those tests becomes a lot easier.
date: "2016-11-11T11:11"
path: "/unit-testing-front-end-javacript-with-ava-and-jsdom/"
tags:
  - javascript
  - testing
  - ava
  - jsdom
---

Writing tests for JavaScript code that interacts with the DOM can be tricky. Luckily, using a combination of [AVA](https://github.com/avajs/ava) and [jsdom](https://github.com/tmpvar/jsdom), writing those tests becomes a lot easier.

This article will walk you through how to set everything up so you can get started writing your tests today.

## What is AVA?

AVA is described as a "*Futuristic JavaScript test runner*". Sounds fancy, huh?! So, what is it exactly that makes it "*futuristic*"?!

#### Tests run quickly

AVA runs test files in parallel, each in its own separate process, with the tests inside those files running concurrently. This offers better performance than other test runners that run tests serially, such as Mocha. This also means that each test file is run in an isolated environment — great for writing atomic tests.

#### Simple API

AVA's API is very small because, in AVA's own words, it is "*highly opinionated*". You won't find any assertion aliases here! This reduces the cognitive load required when writing tests.

#### Write tests in ES2015

You don't need to do anything to be able to write tests in ES2015, AVA supports this out of the box! Under the covers it's using Babel to transpile with the `es2015` and `stage-2` presets.

#### No implicit globals

AVA has no implicit globals, simply import it into your test file and you have everything you need.

#### Other benefits

There are a whole host of other benefits which AVA offers such as:

- Promise support
- Generator function support
- Async function support
- Observable support
- Enhanced assertion messages
- Clean stack traces

All of this combined sounds very "*futuristic*" to me!

## Getting off the launchpad with AVA

Now that we know more about AVA, let's create a new project and start writing some tests.

Start by running `npm init` inside a new project folder. This will create a `package.json` file, which will contain various pieces of information about the project such as its name, authors, and dependencies, among others. Hitting enter for each question will fill in a default value.

### Installing AVA

Add AVA to the project by typing `npm install ava --save-dev`, then update the `scripts` section in `package.json`:

```javascript
"scripts": {
  "test": "ava --verbose"
}
```

The `--verbose` flag enables the verbose reporter, which means more information is displayed when the tests are run.

When using npm scripts, the path to AVA in the `node_modules` folder will be resolved for us, so all we need to do is type `npm test` on the command line. Doing so at the moment this will give us an exception:

```bash
✖ Couldn't find any files to test
```

Let's fix that by adding a test.


## Writing a test

Create a `test` directory, with a  file named `demo.test.js` inside, then add a test:

```javascript
import test from 'ava';

test('can add numbers', t => {
    t.is(1 + 1, 2);
});
```

First, AVA is imported into the module, then the `test` function is called, passing a string as the first parameter which describes what the test is doing. The second parameter is the test implementation function which contains the body of the test, this provides us with an object, `t`, from which we can call the assertion functions.

The `is` assertion is used here, which takes two values and checks that they are both equal (using `===` so there is no type conversion).

> **Note**: You can choose any name you like for the `t` parameter, such as `assert`. However, using the `t` convention in AVA will wrap the assertions with [power-assert](https://github.com/power-assert-js/power-assert) which provides more descriptive messages.

Run `npm test` and the test result will be printed out

```bash
√ can add numbers

1 test passed
```

Success! Our test passed as expected. To see an example of what a failing test would look like change the test assertion to `t.is(1 + 1, 1)`. Run the test now and you'll see an error

```bash
× demo » can add numbers
 t.is(1 + 1, 1)

 1 test failed

 1. can add numbers
 AssertionError:
   t.is(1 + 1, 1)
       Test.fn (demo.test.js:4:7)
```

As you can see, there is a lot of useful information provided in order to help us track down the issue.

## Testing modules

To demonstrate how to test a module, create a new folder called `src` in the root of the project with a file inside called `demo-module.js` with the contents:

```javascript
export function demo () {
    return 'Hello, from demo module.';
}
```

Update `demo.test.js` by first importing the module, then adding a new test:

```javascript
import test from 'ava';
import { demo } from '../src/demo-module';

...

test('can import from demo module', t => {
    const expected = 'Hello, from demo module.';

    const result = demo();

    t.is(result, expected);
});
```

Running `npm test` now will give you the following exception

```bash
export function demo () {
^^^^^^

SyntaxError: Unexpected token export
```

Uh oh, what happened?

AVA will transpile ES2015 code in your tests; however, it won't transpile code in modules imported from outside those tests. This is so that AVA has zero impact on your production environment.

If our source modules are written in ES2015, how do we tell AVA that we'd like them to be transpiled too?

## Transpiling source files

To transpile source files, the quick and dirty option is to tell AVA to load `babel-register` which will automatically transpile the source files on the fly. This is ok if you have a small number of test files, but there is a performance cost which comes with loading `babel-register` in every forked process.

The other option is to transpile your sources before running the tests in order to improve performance.

The next two sections look at how each technique can be achieved.

### Transpile with `babel-register`

Add `babel-register` by running `npm install babel-register --save-dev`, then add a `"babel"` config to `package.json`

```javascript
"babel": {
  "presets": ["es2015"]
}
```

Next, add `"babel-register"` to the AVA `"require"` section

```javascript
"ava": {
  "require": ["babel-register"]
}
```

Run `npm test` and the tests will once again pass, great!

```bash
√ demo » can add numbers
√ demo-module » can import from demo module

2 tests passed
```

The recommendation from the AVA team is to use `babel-register` "*[until the performance penalty becomes too great](https://github.com/avajs/ava/blob/master/docs/recipes/babelrc.md#transpiling-sources)*". As your test base grows you'll need to look into setting up a precompilation step.

### Setting up a precompilation step

A precompilation step will transpile your source modules *before* the tests are run in order to improve performance. Let's look at one way to set this up.

> **Note**: If you were following along with the last section you'll need to remove the references to `babel-register`. First run `npm uninstall babel-register --save-dev`, then remove `"babel-register"` from the AVA `"require"` section in `package.json`.

Start by adding the `babel-cli` and `babel-preset-es2015` packages to the project: `npm install babel-cli babel-preset-es2015 --save-dev`.

Next, add a `"babel"` config to  `package.json`

```javascript
"babel": {
  "presets": ["es2015"]
}
```

In order to run the tests, we need to update the npm scripts. Add a new npm script called `precompile`

```javascript
"scripts": {
    "precompile": "babel src --out-dir=dist",

    ...
 }
```

The `precompile` npm script will tell Babel to take the files in the `src` directory, transpile them, then output the results to the `dist` directory.

Next, the `test` npm script needs to be updated so that it runs the precompile step before running the tests

```javascript
"test": "npm run precompile && ava --verbose"
```

The double ampersand (`&&`) tells npm to first run the precompile script and then the AVA tests.

The final task is to update the reference to `demo-module` inside `demo.test.js` to point at the compiled code, we do this by replacing `../src` with `../dist`:

```javascript
import { demo } from '../dist/demo-module';
```

Run `npm test` and we're presented with all green tests!

```bash
√ demo » can add numbers
√ demo-module » can import from demo module

2 tests passed
```

## Testing the DOM using Node

So far we have the ability to test JavaScript code, but what if we'd like to test a function which makes use of the DOM? Node doesn't have a DOM tree, so how do we get around this?

One option is to use a combination of a test runner and a browser — a popular combination is Karma and PhantomJS. These offer a lot of benefits like being able to test against real browsers, run UI tests, take screenshots, and the ability to be run as part of a CI process.

However, they typically come with a fairly large overhead, so running lots of small tests can take minutes at a time. Wouldn't it be great if there was a JavaScript implementation of the DOM?

Welcome to the stage; jsdom!

### jsdom

jsdom is described as "*A JavaScript implementation of the WHATWG DOM and HTML standards, for use with Node.js*".

It supports the DOM, HTML, canvas, and many other web platform APIs, making it ideal for our requirements.

Because it's purely JavaScript, jsdom has very little overhead when creating a new document instance which means that tests run quickly.

There is a downside to using a JavaScript implementation over an actual browser – you are putting your trust in the standards being implemented and tested correctly, and any inconsistencies between browsers will not be detected. This is a deal breaker for some, but for the purposes of *unit* testing I think it is a reasonable risk to take; jsdom has been around since early 2010, is actively maintained, and thoroughly tested. If you are looking to write UI tests then a combination of something like Karma and PhantomJS may be a better fit for you.

### Integrating jsdom

Setting up jsdom can be a daunting task, the documentation is great, but very lengthy and goes into a lot of detail (you should still read it!). Luckily a package called [browser-env](https://github.com/lukechilds/browser-env) can help us out.

Add browser-env to the project `npm install browser-env --save-dev`.

Create a `helpers` directory (which is ignored by convention when using AVA) inside `test`, then add `setup-browser-env.js` with the contents

```javascript
require('browser-env')();
```

We need to tell AVA to require this module before any of the tests are run so that browser-env can create the full browser environment before any DOM references are encountered. Inside your `package.json` add

```javascript
"ava": {
  "require": ["./test/helpers/setup-browser-env.js"]
}
```
> **Note**: You may have noticed that this file is written in ES5. This is because AVA will transpile ES2015 code in the tests, yet it won't transpile any modules *imported* or, in this case, *required* from outside the tests — see the [*transpiling source files*](#transpiling-source-files) section.

### Testing the DOM

Let's write a test which makes use of the `document` global which has been provided thanks to jsdom. Add a new test to the end of `demo.test.js`:

```javascript
...

test('can query for DOM elements', t => {
    document.body.innerHTML = '<p>Hello, world</p>';

    const para = document.querySelector('p');

    t.is(para.innerHTML, 'Hello, world');
});
```

First, we add a paragraph element with some text to the document body, then query for that element using `document.querySelector`, and finally, we verify that the selected paragraph tag has an  `innerHTML` value equal to `'Hello, world'`.

Run the tests with `npm test`

```bash
√ can add numbers
√ can query for DOM elements

2 tests passed
```

Congratulations, you've just unit-tested the (virtual) DOM!

## Test coverage with nyc

As a bonus let's quickly set up some test coverage. Because AVA runs each test file in a separate Node.js process, we need a code coverage tool which supports this. [nyc](https://github.com/bcoe/nyc) ticks the box — it's basically istanbul with support for subprocesses.

Add it to the project with `npm install nyc --save-dev`, then update the `test` npm script by adding `nyc` before the call to `ava`:

```javascript
"scripts": {
  "test": "nyc ava --verbose"
}
```

You'll also need to update the Babel config to tell it to include source maps when developing so that the reporter can output the correct lines for the transpiled code:

```javascript
"babel": {
  ...

  "env": {
    "development": {
      "sourceMaps": "inline"
    }
  }
}
```

Run the tests and witness the awesome code coverage table!

```bash
  √ demo-module » can import from demo module
  √ demo » can add numbers
  √ demo » can query for DOM elements

  3 tests passed

----------------|----------|----------|----------|----------|----------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------|----------|----------|----------|----------|----------------|
All files       |      100 |      100 |      100 |      100 |                |
 demo-module.js |      100 |      100 |      100 |      100 |                |
----------------|----------|----------|----------|----------|----------------|
```

## What next?

If you're interested in what else you can do with AVA, have a look through the [AVA readme](https://github.com/avajs/ava/blob/master/readme.md), check out the [AVA recipe docs](https://github.com/avajs/ava/tree/master/docs/recipes), read about [common pitfalls](https://github.com/avajs/ava/blob/master/docs/common-pitfalls.md), and listen to this [JavaScript Air podcast episode](http://jsair.io/ava). I'd also recommend looking into [setting up linting](https://github.com/avajs/eslint-plugin-ava) for your code.

You can [browse the source code for this blog post on GitHub](https://github.com/DamianMullins/ava-jsdom-unit-testing).

So, now you have no excuse for not testing your front-end JavaScript!
