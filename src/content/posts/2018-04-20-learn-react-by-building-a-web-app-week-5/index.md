---
slug: '/learn-react-by-building-a-web-app-week-5/'
title: Learn React by building a web app — Week 5
date: '2018-04-20T15:53'
description: Two posts in two days? Unheard of! It's hackathon time at work so I have been spending my time working on the Coinsly app.
tags:
  - learning
  - react
  - projects
  - coinsly
published: true
---

Two posts in two days? Unheard of! It's hackathon time at work so I have been spending my time working on the Coinsly app. As I've made so many changes I wanted to write it all up now with the aim of keeping any future blog posts shorter.

No goals this week, I decided what I ‘d like to work on next as I went 🤠

> TLDR: I've started to apply some new patterns such as render props and am beginning learn more about other techniques such as the context API and CSS in JS by using them in the app. [Take a look at the end of week one section to see the final code](#end-of-week-five).

Here's a quick rundown of the changes I have made

- [Styles](#styles)
- [Filter updates](#filter-updates)
- [Patterns](#patterns)
- [Context API](#context-api)
- [Database updates](#database-updates)
- [Other updates](#other-updates)

<a id="styles" aria-hidden="true"></a>

## Glamorous

I was getting tired of the lack of styling so I applied some really basic styles using [glamorous](https://glamorous.rocks/). This is only a rough layout to tide me over until I come up with an actual design (the hold up on the design is figuring out how best to display all of the information and filters, especially on small screens).

The documentation for glamorous is really good so I was able to very quickly start adding styles. I'm still struggling to see the benefits of CSS in JS, I'm sure there must be something that I'm missing, but I'm going to stick it out a bit longer in the hope that I'll figure it out soon.

I did look into using CSS modules before settling on glamorous but they aren't supported in Create React App at the moment, [they will be in v2 though](https://github.com/facebook/create-react-app/pull/2285) 😼

## Flexbox

I'm familiar with flexbox and have used it a fair bit in the past, however, recently at work we've been using a lot of utility classes which handle grid layouts etc so I've been using those rather than writing the styles myself. I know, excuses excuses..

Because of this I have had to do a lot of searching online to find out how to achieve some pretty basic layouts 😳 I may work my way through [flexbox froggy](https://flexboxfroggy.com/) or [flexbox defence](http://www.flexboxdefense.com/) again to refresh my memory.

<a id="filter-updates" aria-hidden="true"></a>

## Filter updates

The coin filtering logic has been moved out into a `coinHelper` module.

The coin filtering is now run from within the `App` component rather than the `CoinList` component which allowed me to simplify the `CoinList` component a little.

### Denomination filter

A new filter has been added which allows the user to filter by coin denomination. In order to test this new filter I added a small amount of additional coin data to the database.

### State

I added a `filteredCoins` property to state which holds an array of the coins after the filters have been applied, this is passed down to the `CoinList` component.

A few other filter properties have been added to state as well:

- `filters` — an array of all the filters available.
- `filter` — the active filter.
- `denominations` — an array of all the denominations available.
- `denomination` - the active denomination.

### Dynamic filters

The filter components have been refactored so that the controls are added dynamically based on the props passed in.

<a id="patterns" aria-hidden="true"></a>

## Patterns

When building the new `Totals` component I decided that it would be a good candidate to build using the render prop pattern.

The `Totals` component takes a list of coins as props and then stores values in state for the total coin count, the total “owned” coin count, and the percentage of owned coins out of the total coin count:

```js
this.setState({
  total: …,
  owned: ...,
  percentage: ....
});
```

The values stored in state are then passed as a parameter to the children prop (which is a function when using this pattern):

```js
render() {
  return this.props.children(this.state);
}
```

Then in the consuming component the values can be accessed like this:

```js
<Totals coins={coins}>
  {({ total, owned, percentage }) => (
    ...
  )}
</Totals>
```

### Using the Total component

I use the `Totals` component to display details for the currently filtered coin denomination:

```jsx
<Totals coins={filteredCoins}>
  {({ total, owned, percentage }) => (
    <p>
      {this.state.denomination} Total {owned} of {total} ({percentage}%)
    </p>
  )}
</Totals>
```

Which results in something like `"25p Crown Total 1 of 4 (25%)"`.

The `Totals` component is also used to display details for all the coins in the app:

```jsx
<Totals coins={coins}>
  {({ total, owned, percentage }) => (
    <p>
      Total {owned} of {total} ({percentage}%)
    </p>
  )}
</Totals>
```

Which results in something like `"Total 3 of 30 (10%)"`.

<a id="context-api" aria-hidden="true"></a>

## Context API

The Context API was recently updated in React so I decided to test it out by using it to pass the `isLoading` state property to different components, without having to pass it around via props.

Initially I found it a little confusing, but after following the walkthrough in the React documentation all became clear.

I created a `LoadingContext` module which I used in the app to set the context value using `LoadingContext.Provider`:

```jsx
<LoadingContext.Provider value={isLoading}>…</LoadingContext.Provider>
```

Then in any components which needed to read the value, I used `LoadingContext.Consumer` to provide the value like so:

```jsx
<LoadingContext.Consumer>
  {isLoading => (
    ...
  )}
</LoadingContext.Consumer>
```

You may notice that it uses a render prop to pass along the context value 🙌

I also used the context API to pass the `handleOwnedChange` event handler from the `App` component down to the `Coin` component. I'm not sure this is the best use of the context API as the event handler is only used in one place and it only removed one level of prop drilling which is probably an acceptable level to have left in place.

<a id="database-updates" aria-hidden="true"></a>

## Database updates

After reading through the Firebase documentation a little more over the last few weeks I decided to do away with the user's collection in the database which I had created to hold a subset of a logged-in users details. All of this information is already saved to Firebase — plus I store the entire user object in state anyway — so removing the collection made sense.

<a id="other-updates" aria-hidden="true"></a>

## Other updates

### Owned list

The `owned` state property was really bugging me, because it was stored separately to the coin data it meant that the filter logic was unnecessarily complex. To resolve this I removed the property from state and instead added the `ownedId` to any coins owned by the user.

[This is done in the `coinApi` module](https://github.com/DamianMullins/Coinsly/blob/9eed188ead3e4796c59c0daa565649da3a99b65c/src/api/coinApi.js#L7-L30) where two calls to the database are made, one to get the coins, and another to get the owned list. The `ownedId`'s are then added to the matching coins.

So given an owned list of

```json
[{ "ownedId": 1, "coinId": 2 }]
```

and a coin list of

```json
[{ "coinId": 2 }, { "coinId": 3 }]
```

You end up with

```json
[{ "coinId": 2, "ownedId": 1 }, { "coinId": 3 }]
```

Now the filter logic only has to check that a coin has an `ownedId` property with a value which isn't `undefined` in order to tell that the user has marked that coin as “owned”. Much simpler.

As part of this change I also had to create some helper functions, the first of which adds the `ownedId` property to a coin object when it is marked as “owned”, and the second removes the `ownedId` property when a coin is marked as “needed”.

### Forms

The form elements in the coin list are now all disabled whilst `state.isLoading` is true i.e. when a database transaction is being made. Rather than disabling the elements directly, the `disabled` attribute is applied to a `fieldset` element which wraps the form, this has the effect of disabling all form elements within that fieldset — this is standard HTML behaviour by the way, no React specific code here.

The form `onSubmit` handlers were removed from the forms in the `Filters` and `Coin` components as I'm no longer planning to render on the server — all of the actions are triggered via `onChange` attributes directly on the form inputs.

### `Header` component

The `header` component now contains a lot more than it did previously such as the logged-in user's name and profile pic, the login and logout buttons, the loading indicator, as well as a new `Totals` component which displays information relating to the current number of coins the user has collected.

### TravisCI

The TravisCI build was failing because the react-testing-library module I added in the first week is incompatible with NodeJS v6 and lower. As I'd like to use this module in the future I decided to remove v6 from the TravisCI builds.

I also removed the NodeJS v7 build as it isn't an LTS version.

### CodeSandox

I've started developing on my laptop rather than using CodeSandox as I find it much easier to debug my code — I'm still struggling to get the debugger in VSCode to attach though which is annoying.

I was also having issues with firebase authentication every now and then using CodeSandox, moving to local development resolved those issues.

<a id="end-of-week-five" aria-hidden="true"></a>

## End of week five

You can [check out the code on the GitHub repo](https://github.com/DamianMullins/Coinsly/tree/9eed188ead3e4796c59c0daa565649da3a99b65c), or view and run it in the CodeSandox window below.

<iframe src="https://codesandbox.io/embed/k5o3l8jv8r?autoresize=1&module=%2Fsrc%2Fcomponents%2FApp.js&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Another great bit of progress made, I feel like I've learnt a lot over the last few days. Building the app and then writing about my experiences is really helping to solidify my knowledge of React. There is still a hell of a lot more to learn though..
