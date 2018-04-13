---
title: Learn React by building a web app
description: So, I decided a few months back that I’d like to learn a JavaScript framework this year. It’s something I’ve wanted to for quite a while but I’ve always put it off for various reasons.
date: "2018-03-21T18:01"
path: "/learn-react-by-building-a-web-app/"
tags:
  - learning
  - react
  - projects
---

> TLDR: I'm going to learn React by writing a coin collecting app using CodeSandbox and will post an update on my progress each week.

So, I decided a few months back that I’d like to learn a JavaScript framework this year. It’s something I’ve wanted to do for quite a while but I always put it off for various reasons; too busy; can’t apply the knowledge at work because we don’t use any frameworks; no idea what I’d build if I did learn; insert other lame excuse here.

Then, recently, whilst searching for an app which I could use to track my coin collection (yes, I collect coins!), I was struggling to find something which had all of the features I wanted; had good performance; and generally looked and felt good to use. This inspired me to finally set some time aside to start learning a framework by actually building something I (and hopefully others) would find useful — a basic, fast, coin collection tracking app which is easy to use and looks good!

My plan is to post an update on my progress each week, even if all I did that week was read some articles.

## Choosing a framework

The first step is to choose a framework, this is fairly easy for me as there is one framework in particular which I have noticed has been driving some really great patterns and coding practices, offers a simple API with lots of flexibility in the ways you can build applications using it, as well as being very performant. That framework is React.

I’ll be honest, I *have* used the framework before — mostly taking example code from blogs and playing around with it. A colleague and I also [ran a few sessions of a React workshop](https://github.com/react-sessions) where we walked a group of engineers through the basics of React, setting up coding exercises so that everyone got some hands-on experience using the framework. Planning those workshops involved reading a lot of blog posts and taking some online courses but a lot of that knowledge has since faded from memory.

So what I’m trying to say is that whilst I’m already familiar with the basic concepts of React, I’ve never put what I learned into practice. Running the workshop helped me to learn a lot, and teaching is a great way of learning, but I have a feeling that when it comes to writing some actual code I’ll have that classic struggle where I realise that reading and watching videos is all good, but nothing compares to actually building something in order to really solidify that knowledge.

<a id="what-am-i-going-to-build" aria-hidden="true"></a>

## What am I going to build?

As I mentioned previously, I’m going to build a coin collecting app and to start with it’s going to be dead simple.

It will:

- Display a list of coins
- Group coins according to their denomination (£1, £2, etc)
- Provide a way for the user to mark a coin as “collected”
- Have filters for coin denomination, showing owned coins, and showing coins needed
- Require users to sign in so that their data can be saved to a datastore

That’s about it. I have a few ideas of other features I’d like to add in the future but I don’t want to overcomplicate things at the start and risk holding everything up, or worse; giving up because there is too much to do.

## How am I going to build it?

Before writing this post [I read an article by Kent C. Dodds](https://blog.kentcdodds.com/merry-christmas-77b4380b8cf9) where he mentions that he used CodeSandbox to build an app for his wife. The thought of using an online editor to build an app sounded crazy to me but I tried it out for myself [using their create-react-app sandbox](https://codesandbox.io/s/new) and was really impressed! It’s really fast, integrates with your GitHub account, has some great tooling added by default (prettier,  ESLint), plus it will run your unit tests as you work.

Using CodeSandbox means that I can work on the project wherever I am, as long as I have an internet connection and a browser, and because of the GitHub integration there is also the option to clone the repo and develop on my laptop if I want to.

## My learning style

This section is here in case anyone other than myself ends up reading this!

My method of learning a new technical skill is typically not very structured, I don't tend to plan too far ahead so there will be no architecture diagrams or detailed descriptions of features I plan to implement in future posts.

My general approach is to find and read blog posts, watch training videos, and sometimes find a good book on the subject. I follow that up by writing some throwaway code which allows me to quickly try the codebase out to see if it works as I expect it to, and find out if there is any behaviour which is unexpected.

That’s how I learn and it works for me — lots of failure driven development! I’m probably not really selling myself as a UI engineer very well in this section 🙈

One other thing to note is that I’ll often spend a week or so either writing no code at all - perhaps reading or even spending time away from the project completely. I have a young family so it's important to me that I don't shut myself off from them, spending time with family is much more important to me than learning in my spare time.

I find that taking breaks like that allows everything I’ve learned so far to sink in. Often I find that if I become stuck on an issue which I can't figure out taking a step back allows my brain to recover and sometimes I'll subconsciously figure out a solution which takes minutes to implement.

##  Plan for the first week

So the plan for the first week looks like this:

- Get a basic app up and running in CodeSandbox (I’ll keep things simple by only adding a few coins to start with)
- Break sections of the markup into components: filters, coins etc
- Add some state to track collected coins and apply filters
- Look into database options

Right, enough of my waffling, I'll post again in a week.
