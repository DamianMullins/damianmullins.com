---
title: Filter visible labels and set checkbox attribute by textbox input
path: "/filter-visible-labels-and-set-checkbox-attribute-by-textbox-input/"
date: 2012-10-22T17:26
draft: true
tags:
  - javascript
  - jquery
---

Recently I wrote some javascript which filtered a form label's visibility based on a match between the label text and text entered into a textbox. Someone may find it useful so let me take you through the steps involved in putting this thing together.

I had the following html to work with.

```markup
<input type="text" class="textbox-filter">

<div class="checkboxes">
    <label><input type="checkbox" />Western Europe</label>
    <label><input type="checkbox" />Eastern Europe</label>
    <label><input type="checkbox" />North America</label>
    <label><input type="checkbox" />Selected Central America</label>
    <label><input type="checkbox" />Selected South America</label>
    <label><input type="checkbox" />Asia Pacific</label>
    <label><input type="checkbox" />Selected Africa</label>
    <label><input type="checkbox" />Selected Middle East</label>
</div>
```

To start we bind a keyup event to the filter textbox, all our code will be contained inside this function, the first variable being the lowercase text entered by the user.

```javascript
$('input.textbox-filter').keyup(function () {
    var text_value = $(this).val().toLowerCase();
    ...
});
```

Next we loop over each label element inside the target div, I gave the div a class of _.checkboxes_.

```javascript
$('.checkboxes label').each(function () {
    ...
});
```

We can grab the text from each label, converting to lowercase as the match would otherwise be case sensitive. Then we find the input element nested within the label, I've used the `:first` selector so that only the first input element is matched (in case of multiple).

```javascript
var label_text = $(this).text().toLowerCase(),
    $input_element = $(this).find('input:first');
```

We now have the text entered by the user and the text of the label, we compare the two using the _(string).indexOf_ method. indexOf returns the int index of the first occurrence of the specified value (in our case text_value). So any value greater than or equal to zero means we have a match!

```javascript
var matched = (label_text.indexOf(text_value) >= 0);
```

If the input element is a checkbox then set its checked attribute to the value of `matched`.

```javascript
if ($input_element.is(':checkbox')) {
    $input_element.attr('checked', matched);
}
```

Using the _matched_ boolean we can set the visibility of the input like so.

```javascript
$(this).css('display', (matched ? 'block' : 'none'));
```

All together the function looks like…

```javascript
$('input.textbox-filter').keyup(function () {
    var text_value = $(this).val().toLowerCase();

    $('.checkboxes label').each(function () {
        var label_text = $(this).text().toLowerCase(),
            $input_element = $(this).find('input:first'),
            matched = (label_text.indexOf(text_value) >= 0);

        if ($input_element.is(':checkbox')) {
            $input_element.attr('checked', matched);
        }
        $(this).css('display', (matched ? 'block' : 'none'));
    });
});
```

Here's a [JsFiddle so you have a play](http://jsfiddle.net/Damian/6RXNn/), and here's a jQuery plugin which you can download, fork, whatever over on [Github](https://github.com/DamianMullins/jquery-checkboxfilter).

Not sure how useful it is really, but it's always nice when I get the chance to create a plugin.
