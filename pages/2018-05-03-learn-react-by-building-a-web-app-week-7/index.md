---
title: Learn React by building a web app — Week 7
description: It has been a busy two weeks of reading, listening to podcasts, and watching talks online. I did manage to make a few updates and bug fixes to Coinsly which I've listed in the sections below.
date: "2018-05-03T10:33"
path: "/learn-react-by-building-a-web-app-week-7/"
tags:
  - learning
  - react
  - projects
---

It has been a busy two weeks of reading, listening to podcasts, and watching talks online. I did manage to make a few updates and bug fixes to Coinsly which I've [listed below](#changes-to-the-coinsly-app).

## Podcasts

I had some time whilst travelling to London recently which gave me time to catch up on a few podcasts I've wanted to listen to.

- [React Router with Michael Jackson — egghead.io developer chats](https://egghead.simplecast.fm/cef87f81)
- [Setting Up and Getting Used to Gatsby with Aman Mittal — React Round Up](https://devchat.tv/react-round-up/rru-006-setting-up-and-getting-used-to-gatsby-with-aman-mittal)
- [Dev Environments — CodePen Radio](https://blog.codepen.io/2018/04/10/169-dev-environments/)
- [Advanced Component Patterns and Downshift with Kent C. Dodds — React Round Up](https://devchat.tv/react-round-up/rru-003-advanced-component-patterns-and-downshift-with-kent-c-dodds)

## Videos

- [Dan Abramov: Beyond React 16 | JSConf Iceland 2018](https://www.youtube.com/watch?v=nLF0n9SACd4)
- [Getting Started with Create React App](https://www.youtube.com/watch?v=eCz3rhsDG5s)
- [Debugging a Create React App with VS Code](https://www.youtube.com/watch?v=UI7dpnVoad8)
- [Adding Storybook Style Guide to a Create React App](https://www.youtube.com/watch?v=va-JzrmaiUM)
- [Forking instead of Ejecting a Create React App](https://www.youtube.com/watch?v=I22TW-33dDE)
- [Add ESLint & Prettier to VS Code for a Create React App](https://www.youtube.com/watch?v=bfyI9yl3qfE)
- [Bootstrap a React App with Parcel](https://www.youtube.com/watch?v=ybjmUgKW3vU)
- [What's New in React 16.3.0](https://www.youtube.com/watch?v=WhWqy-vxKS8)
- [Polyfill React 16.3 New Lifecycle Hooks](https://www.youtube.com/watch?v=djXh1vaDarg)

## Blog posts

- [How to React ⚛️](https://blog.kentcdodds.com/how-to-react-%EF%B8%8F-9e87f48414d2)
- [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)

<a id="changes-to-the-coinsly-app" aria-hidden="true"></a>
## Changes to the Coinsly app

A very quick run-through of the changes I've made.

- Updated package dependencies to latest versions.
- Fixed firestore warning by passing a `timestampsInSnapshots: true` setting.
- After first signing in an error was being thrown because the filters prop in the `Filters` component is `null` when created. To fix this I provided a default value of an empty array.
- Fixed issue with totals component where `NaN` was being displayed on initial load because the default values in state are set to `0` which causes a divide by zero exception when working out the percentages.
- Refactored `coinHelper` to use a new filter method, and to prevent multiple copies of objects being made.

You can [check out the code on the GitHub repo](https://github.com/DamianMullins/Coinsly/tree/35b64c58e6384c5aa6da8a0c3a4da11d41e01a96), or view and run it in the CodeSandox window below.

<iframe src="https://codesandbox.io/embed/06xkj9lpv?autoresize=1&module=%2Fsrc%2Fcomponents%2FApp.js&view=editor" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
