---
title: Learn React by building a web app — Week 1
description: So, I decided a few months back that I'd like to learn a JavaScript framework this year. It's something I've wanted to for quite a while but I've always put it off for various reasons.
date: "2018-03-29T22:13"
path: "/learn-react-by-building-a-web-app-week-1/"
tags:
  - learning
  - react
  - projects
---

> TLDR: I've made some good progress in my first week, I need to tidy a few bits up and would like to start looking at applying some patterns, but I'm happy with what I have achieved so far. Take a look at the [end of week one section to see the final code](#end-of-week-one).

I've just completed my first week learning React by building an application and it has gone better than expected 👐

This post is a run-through of *what* I spent my week working on rather than a guide to *how* I did it.


## The plan

The plan at the start of the week looked like this

- Get a basic app up and running on [CodeSandbox](https://codesandbox.io).
- Break sections of the app into components.
- Add some state to track "owned" coins and apply filters.
- Look into database options.

I also set myself a few stretch goals

- Retrieve data from a database.
- Set up continuous integration.
- Look into unit testing best practices in React.


<a id="what-features-will-be-in-the-first-iteration" aria-hidden="true"></a>

## What features will be in the first iteration?

[Last week I decided on some of the features of the app](/learn-react-by-building-a-web-app/#what-am-i-going-to-build). This week, for the first iteration, I would like the app to

- Display a list of coins.
- Provide a way for the user to mark a coin as "owned".
- Have filters for coin denomination and showing "owned" & "needed" coins.
- Require users to log in so that their data can be saved to a database (stretch goal).


## Choosing a name

Before I could start creating the project I had to come up with a name. I needed a name which isn't in use in any of the app stores already and something which is easy to remember. I came up with Coinsly, which is nice and short and, I think, sounds "app like".


## Starting out

I started by using [the Create-React-App sandbox on CodeSandbox](https://codesandbox.io/s/new), this provided a great starting point — no need to add npm dependencies, configure webpack config, or set up linting tasks — it's all done for you.

My thinking was that If Create-React-App becomes too restrictive then I'll run the eject task so I can tweak the config in any way I see fit. Hopefully I won't have to do that for a while yet as I'd like to stay focused on building the app rather than having to dig into webpack configuration.


## Component details

There are a few conventions which I picked up and used throughout my components.

### Arrow functions on class properties

I started using [arrow functions on class properties](https://babeljs.io/docs/plugins/transform-class-properties/) for event handler functions quite early on as it means that you do not have to bind the context for the function in the constructor.

So rather than this:

```js
class App extends Component {
  constructor() {
    super();

    this.handleFilterSubmit.bind(this);
  }

  handleFilterSubmit () {
    ...
  };
}
```

You can do this instead:

```js
class App extends Component {
  handleFilterSubmit = e => {
    ...
  };
}
```

Much clearer and less code to write.

### Types of components

There are a few styles you can use to write components in React, I used two of the most common; class and stateless functional components. I'll describe where I used each in the component details below.

### PropTypes

PropTypes were added to each component to ensure that while developing the app the correct required & optional props were being passed. This saved me a lot of headaches as DevTools shows a warning when you forget to pass a prop or pass the wrong type.

### Async/Await

Create-React-App supports async/await out of the box so I went ahead and used the feature in place of the promise syntax across the entire codebase.


## The components

Right, on with the component details!

[Based on my plan above](#what-features-will-be-in-the-first-iteration) I figured that I'd need five components in total. I'll describe each one in detail below starting with the lowermost child and working up.

### `Coin` Component

This is a stateless functional component which displays details for an individual coin as well as providing a way for the user to mark the coin as "owned".

<a id="coin-component-props" aria-hidden="true"></a>

#### Props

- `coin` - an object which holds the details of a single coin.
- `owned` - an array of all of the coin ID's the user has marked as "owned". Has a default value of `[]`.
- `handleOwnedChange` - this function is called when a coin is marked as "owned". It updates the `owned` property in state.

Not much to say about this component other than it sets the `checked` property of the owned checkbox by looking up the coin ID in the `owned` state:

```html
<input
  ...
  checked={owned.find(o => o.coinId === coin.id) !== undefined}
/>
```

### `Filters` component

This is a stateless functional component which contains the filter elements allowing the user to filter which coins are visible.

#### Props

- `filter` - a string which is set to the current filter. Has a default value of `'all'`.
- `handleSubmit` - a function which is called when submitting the filters form. It updates the `filter` property in state.
- `handleChange` - this function is called when selecting a filter. It updates the `filter` property in state.


### `CoinList` component

This is a stateless functional component which handles filtering and displaying the list of coins. Each coin in the filtered list is then passed to a `Coin` component.

If there are no coins to display then a message is shown to the user.

#### Props

- `coins` - an array of all the coins before any filters have been applied. Has a default value of `[]`.
- `owned` - an array of all of the coins the user has marked as "owned". Has a default value of `[]`.
- `filter` - a string which is set to the current filter.
- `handleOwnedChange` - a function which is [passed down and used in the Coin component](#coin-component-props).
- `handleSubmit` - a function which is called when submitting the coin list form.

There are three functions which live in the same module as this component; `filterCoins`, `filterNeeded`, and `filterOwned`.

The `filterCoins` function calls one of the other two methods based on the filter string passed to it, if the filter is `'all'` then it returns the coin list unfiltered. The other two methods do what you would expect; `filterNeeded` returns the coins which the user has marked as "needed"; and `filterOwned` returns the coins which the user has marked as "owned".

I'm not completely happy with these functions living in the same module as the `CoinList` component so I'll most likely move them out into a helper module in the future, that way I keep the modules focused and can unit test the logic a little easier.

### `Header` component

The header component a stateless functional component which displays the app title at the top of the page. I didn't really have to break this out into a component but I was thinking that more could be added in the future such as the logged in users name.

#### Props

- `title` - the name of the app.

### `App` component

The top-level component which, at the moment, holds all of the state for the app. It also passes down event handlers to child components.

`App` is a class component as it holds state and makes use of the `componentDidMount` lifecycle method to load data and handle authentication events.

#### Initial State

These properties have mostly been covered already in the component props details above but I'll add descriptions again here for reference.

- `user` - an object containing a users logged-in details.
- `isLoading` - a boolean which handles displaying a loader indicator to the user.
- `coins` - an array of all the coins in the app, before any filters have been applied.
- `owned` - an array of all of the coin ID's the user has marked as "owned".
- `filter` - a string which is set to the current filter. Values can be `'all'`, `'onlyNeeded'`, or `'onlyOwned'`.

#### `componentDidMount()`

Once the component has mounted an event listener is added which checks for firebase authentication changes ([more on this in the next section](#firebase-authentication)). Once it detects that a user has logged in it'll load in the coin and owned data from the database and add it to state.

#### `login()` & `logout()`

These two functions call firebase to handle the authentication steps. `login` will add the user details into state, and `logout` will reset state back to its initial ..state?!

#### `Render()` method

This is where we tell React how we want all of the imported components to be displayed and which props we'd like to pass to each.

I made use of conditional logic a fair bit here, for example the loading indicator is displayed if `state.isLoading` is true:

```js
{ this.state.isLoading && <p>Loading</p>}
```

React will [only render the HTML if this.state.isLoading has a truthy value](https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored).

### `index` module

Not a component, but included here for completeness, this is the entry point for the app where we tell React where and what it should render.


## Firebase — Stretch goal!

I've looked into hosted database options for web apps in the past and have always felt like there was a mountain of things to learn, loads of config to set up, and the API's tend to be quite complicated when it comes to interacting with the database itself.

Then, whilst looking the source code for [Kent C. Dodds' Repeat TODO app](https://github.com/kentcdodds/repeat-todo-v2), I noticed he was using Firebase so I decided to check it out.

I found a great [tutorial by Simon Bloom on CSS Tricks called Intro to Firebase and React](https://css-tricks.com/intro-firebase-react/), and following the steps in the article I had an app which could read and write to a database and some basic authentication set up within 30 minutes.

Following this, I decided to add a [Cloud Firestore database](https://firebase.google.com/products/firestore/) to my app. Firestore is in beta but it's heavily documented and, so far, I haven't had any issues with it.

<a id="firebase-authentication" aria-hidden="true"></a>

### Firebase Authentication

Firebase provides a few different ways to implement authentication into your application. I went for a Google auth provider which allows users to register or log in with their Google account. The code to get this working was very simple:

```js
import firebase from 'firebase';

export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export const logIn = async () => {
  try {
    const result = await auth.signInWithPopup(GoogleAuthProvider);
    return result.user;
  } catch (ex) {
    return null;
  }
};

export const logOut = async () => {
  await auth.signOut();
};
```

In the `componentDidMount` lifecycle method of the `App` component I added a small bit of code which was able to detect when a user has signed in:

```js
async componentDidMount() {
  auth.onAuthStateChanged(async user => {
    ...
  });
}
```

That's all it took to implement some basic authentication into the app!

### Adding data

I wanted to add some of the coin data to the database so I created a `firebaseService.js` module which exposed the Firestore database object:

```js
import firebase from 'firebase';

export const db = firebase.firestore();
```

Then I created a `coinService.js` module which contained a function that could add one coin to the store at a time using the database object:

```js
import { db } from './firebaseService';

export const addCoin = async ({ denomination, name, year, order }) => await db
    .collection('coins')
    .add({ denomination, name, year, order });
```

I passed my coin data to this function one coin at a time until it was all added, which took less than a second!

### Building up the services

Next, I created a few other services to handle retrieving and adding data for the "owned" coins list and user details.

This took a while as I had to reference the Firestore documentation a fair bit to get things working as I wanted them to.

All of the calls to the database use promises so I took the opportunity to use async/await everywhere.

### Coin data structure

```js
{
  denomination: string,
  name: string,
  year: number,
  order: number
}
```

### Owned coins data structure

```js
{
  coinId: string,
  userId: string
}
```

When a user is signed in I retrieve all of the records from this collection which have their user ID and then match those records against the coins displayed using `coinId` to show that they are "owned".

### User data structure

```js
{
  userId: string,
  displayName: string,
  email: string,
  photoURL: string,
  creationTime: string,
  lastSignInTime: string
}
```

The reason I added a `userId` property rather than use the generated document ID was because a user ID is passed back when the user logs in when using a sign-in provider which should be the same for a single user regardless of which provider they use to sign in.


## Unit tests — Stretch goal!

I really wanted to start looking into unit testing best practices in React at this point, and coincidentally [Kent C. Dodds had just sent out a newsletter which covered a new unit testing library which he just released](https://github.com/kentcdodds/react-testing-library) which is *"a very light-weight solution for testing React components"*. If you haven't realised already I am a huge fan of Kent and his work!

I followed the readme on the GitHub repository and wrote a couple of basic tests but left it at that point as I feel like I need to do some more reading up on writing React unit tests.


## Continuous integration — Stretch goal!

[I set up a TravisCI build](https://travis-ci.org/DamianMullins/Coinsly) which runs the `yarn build` and `yarn test` tasks against NodeJS versions 7, 8, and 9 whenever changes are pushed to the GitHub repository.

It also [pushes the unit test coverage report up to Coveralls](https://coveralls.io/github/DamianMullins/Coinsly) after a successful test run. My hope is that these reports will spur me on to write more tests and get the coverage up!


## Issues

It wasn't all plain sailing this week, I did hit a few issues along the way.

### State woes

I spent far too long trying to access state in child components which I'd set in the `App` component, completely forgetting that state is private to a component 🤦

Once I (finally) remembered that state in React is private to the component it is defined in I started passing the data down to the child components via`props`.

### Filter logic

I fumbled with the format of the filter state for a while, originally I had each filter type as a separate property in state:

```js
filter: {
  all: true,
  onlyNeeded: false,
  onlyOwned: false
}
```

The filter elements were checkboxes which were a poor choice as it meant that when a filter was selected I had to call a function which set the active/inactive values for the state properties, with those states being applied to the `checked` attribute of each checkbox.

This clearly wasn't going to scale well if I wanted to add more filters in the future as I'd have to create a new property in state and then update the function to see which filter was currently active.

To get around this I created a single state property called `filter` which holds a string description of the current filter to be applied:

```js
{
  filter: 'all'
}
```

Then I switched the checkboxes to radio buttons and grouped them together using the `name` attribute — this is standard HTML,  nothing React specific here.

Each radio button then sets the `checked` attribute based on the filter state value

```html
<input checked={filter === 'all'} />
<input checked={filter === 'onlyNeeded'} />
<input checked={filter === 'onlyOwned'} />
```

### Snapshot testing in CodeSandox

One of the unit tests I wrote used `.toMatchSnapshot()`, this caused an issue in CodeSandbox as it isn't able to create snapshot files.

To get around this I had to clone the repository onto my laptop and run the unit tests with the `-u` flag (`yarn run tests -u`) in order to create the snapshot files, then check the updated files in. Once this was done the test passed in CodeSandbox.

### Prop drilling

At the end of the week I ended up with most of the app logic and all of the handler functions defined in the `App` component which means that there is some prop drilling happening in order to pass state and event handlers down to child components.

Next week I plan to do some reading up on this subject to find out what the best practices are around this.


<a id="end-of-week-one" aria-hidden="true"></a>

## End of week one

Below is the source code for the app as it stands at the end of the first week.

<iframe src="https://codesandbox.io/embed/6vp397pr3z?autoresize=1&module=%2Fsrc%2Fcomponents%2FApp.js&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

I feel like I've made some good progress in my first week, I even managed to work on all of the stretch goals! The app is far from finished and I need to tidy a few bits up, but I'm happy with what I have achieved so far.

It doesn't look great at the moment as I haven't put a design together yet and haven't written any styles. I'd like to figure out what this CSS in JS thing is all about before starting work on this.

Until next week ✌️
