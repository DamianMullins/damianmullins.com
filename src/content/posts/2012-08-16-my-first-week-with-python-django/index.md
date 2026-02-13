---
slug: '/my-first-week-with-python-django/'
title: My first week with Python, Django & Google App Engine
date: '2012-08-16T13:35'
description: Walkthrough of a week spent working with Python, Django & Google App Engine.
tags:
  - dev
  - web dev
  - python
  - django
  - google app engine
  - scss
  - github
published: true
---

This post details the journey through my first week working with Python, Django & Google App Engine. I've had ups and downs (many!), but overall I've come out loving the three of them!

Let's begin...

## My Experience

I'm not gonna lie, I have a little experience Python & GAE, but no experience with Django at all... However I didn't let this hinder me!

## Up & running

My tools of choice were

- Espresso (then later Textmate)
- iTerm (alternative to Terminal)
- Firefox & Chrome
- GitHub app

I run OSX so already had Python 2.7 installed, step one complete and I didn't have to do anything! To keep track of my changes I used Github, I cheated slightly and opted for the Github app rather than the command line option (I have used it previously), I love the interface and wanted to give it a try for this project.

Next up I installed the latest version of Django with no problems (or so I thought), I had issues later when running my app locally and deploying to GAE. Downgrading to Django 1.3 resolved my issues.

## Knowledge

To begin I read up on the background of Django to get an idea of where it came from, who developed it, and how it came to be named Django. Some fairly interesting reading, plus I found out the [correct pronunciation of Django](https://docs.djangoproject.com/en/dev/faq/general/#what-does-django-mean-and-how-do-you-pronounce-it)!

Once I'd concluded my history lesson I began the Django tutorial, ran through it no problems. First impressions were that it's almost _completely_ different to the .Net C# development that I am used to. Lots of new concepts to get my head around, and habits to unlearn. But hey, nothing I hadn't expected.

### Features that stood out to me

- DRY principle
- Model, template, view (MTV) pattern, this makes more sense to me than MVC even though they are essentially the same thing
- Keeping apps in separate directories making it easy to re-use them
- No waiting for project to compile after updating code

### What caught me out

- No curly braces around functions
- No ending semi-colon
- Whitespace indentation (I was expecting this one!)
- Not declaring a type for variables

The documentation was (usually) extremely helpful; I ended up bookmarking a lot from the docs site. Relying heavily on Stack Overflow during development, it was reassuring to see plenty of other people going through the same issues as me whilst they were learning.

There did seem to be a lot of articles from way back in 2008 onwards whilst searching for solutions, which made me worry that I may not be following the latest best practices. I tried to find examples from the official docs as often as I could.

## Building the blog

I decided to run with Django non-rel as there seemed to be plenty of support available, I went ahead and downloaded all the bits and pieces, then got it all up and running.

### Displaying Data

Because I'd ran through the Django tutorial already, I ended up using the content as the base for the blog, just customizing a little here and there to get it how I wanted.

### Building the post admin

Inserting posts was fairly easy; it was when I came to updating a post that I spent an embarrassing amount of time... There didn't seem to be a lot of helpful posts online, at least that I could find. I finally figured out that adding `form = PostForm(instance=post)` to the form variable inside my delete_post view would tell Django that I wanted it to work with an existing record.

I built in the delete functionality late in the project, by this point it took me minutes to put together, Django was beginning to show me some of its power!

### Text Editing

Initially I decided to use the YUI editor as it could run entirely from externally hosted files, however it seemed pretty flakey and didn't handle paragraph tags very well, even with the `ptags` flag set to true. Looking around at alternatives, it occurred to me that if I wanted to keep the blog as simple as possible, maybe I could implement Markdown. One Google search later and I found that Django had a module which can parse markdown. What fun I had with this!..

So to start I installed as per [instructions](http://packages.python.org/Markdown/install.html). Added `django.contrib.markup` to `INSTALLED_APPS`, and received the error `Error in {% markdown %} filter: The Python markdown library isn't installed.`.

Digging through the markdown code in contrib I could see that the error was being thrown because the Markdown package couldn't be found on my machine (obviously). Being a noob I did a little Googling and came across a post which suggested copying the markdown folder into the root of my app, I did this, lo and behold I had Markdown running nicely on my machine and once I'd deployed to GAE.

### Styling

From the start I used the [foundation framework v3](http://foundation.zurb.com/), for various reasons:

- I'd used version 2 and found it very easy to put together a quick prototype
- It supports responsive layouts out of the box
- I wanted to put my SCSS skills to the test

I am aware that IE7 is not supported, but for this project I decided IE7 was not a priority, after all I wanted to get this thing completed quickly!

Throughout development I used a very minimal two column layout, because my focus was on learning Python and Django I decided to leave the majority of the styling until the end. Not my usual approach, I like to plan these things out!

I'd almost gotten the blog to point that I wanted it, when I decided I was tired of looking at a white & grey screen, so I threw together a layout inspired by the recent NASA news about the Mars Curiosity Rover (interestingly, the test scripts for the project were written in Python), hence the star cluster, NGC 346, you see at the top of the page (albeit little further out in space).

## Deploying to Google App Engine

Luckily, I really didn't have many issues deploying to GAE, I did find a few of the concepts hard to pick up at first, such as where was the database? How did it store data?

There's still a lot for me to learn about GAE, evident by the amount of documentation available, but I plan to continue reading through the docs and playing around with the admin settings to find just what I can and can't do.

## Not Included

There are a few features that I have omitted from the blog, these include:

- Ability to manage users
- Cannot change the author of a post (I could add this in a matter of seconds through the PostForm class)
- No categories or tags

These were left out because I didn't feel they were needed at this point (seeing as there is only one post & two users). The whole point of this project was to create a very basic blog and I feel this is about as basic as they come! Saying that, I have a very strong suspicion that they will be present in the near future, I'm feeling that itch to develop...

## Have a look for yourself

The code for the project is all up at [github.com/DamianMullins/basic-blog](https://github.com/DamianMullins/basic-blog), and the blog itself can be found here [basic-blog.appspot.com](http://basic-blog.appspot.com). Go have a look!

To wrap up it's been a fun week, I've learned a lot, and I've enjoyed myself. Here's to more Django development in the future!
