#  monstersource cyoa tracker

to keep you sane during your Divine Trials.

##  author's note

writing quality documentation is difficult. please bear with me.

any of the examples below should work as valid inputs to the cyoa tracker. if they don't, please raise an issue on github.

##  basic use

starting any line with a simple maths operation will apply it to the running total. for example:

```
+ 40
- 10
+  5
```

will total out at: 40 - 10 + 5 = **35**.

you can even use (basic) decimals:

```
+ 10.5
-  4
+  2.5
```

for a total of: 10.5 - 4 + 2.5 = **9**.

### multiplication and division

the system also supports multiplication and division:

```
+ 20
- 10
*  2
+ 30
/  2
```

which totals out at: ((20 - 10) * 2 + 30) / 2 = **25**.

this may be a little unexpected. the system uses a running tally instead of evaluating the entire document at once, so each new operation is applied to the current total, like so:

- 0 + 20 = 20
- 20 - 10 = 10
- 10 * 2 = 20
- 20 + 30 = 50
- 50 / 2 = 25

this is mostly because doing things any other way would have been much harder to code, but it also works better for CYOAs like Divine Trials (as explained further down).

### equals

you can use the equals sign to set the current total to anything you like:

```
+ 20
=100
- 10
= 13
+ 99
= 45
+  5
```

the total here is: 45 + 5 = **50**.

the system essentially ignores everything before the most recent equals sign. (generally this is most useful with sections, which are explained further later on.)

### text labels

and since this is for CYOAs, you can also add text to show what each value is for:

```
+ 20    some detrimental thing
- 10    a moderate option
*  2    a points multiplier
- 40    something expensive
```

which totals at: (20 - 10) * 2 - 40 = **-20**.

## advanced information

### sections

before doing any maths, the cyoa tracker splits the document into sections at lines starting with `#` or `~`. it keeps a subtotal for each section individually, then adds them all together at the final stage.

```
####    cyoa tracker headings example
=100    starting points

~~~~    first section
- 10    some ability
- 20    some stronger ability

~~~~    second section
+ 10    bonus points
- 10    an item
```

this evaluates as: 100 + (- 10 - 20) + (+ 10 - 10) = 100 - 30 + 0 = **70**.

this doesn't actually matter for pure addition and subtraction, though, and mostly affects multiplication and division:

```
####    cyoa tracker headings example
=100    starting points

~~~~    first section
- 10    some ability
- 20    some stronger ability
/  2    everything at half price

~~~~    second section
+ 10    bonus points
- 10    an item
-  5    another item
*  2    everything at double price
```

this evaluates as: 100 + ((- 10 - 20) / 2) + ((+ 10 - 10 - 5) * 2) = 100 - 15 - 10 = **75**.

this is mostly useful for CYOAs like Divine Trials, which uses multipliers for its companion and items sections. without this section-based logic you would have to manually edit each individual item with the halved value.

if you use any other characters as headings, the cyoa tracker will ignore them. so this:

```
@@@@    cyoa tracker headings example
=100    starting points

££££    first section
- 10    some ability
- 20    some stronger ability
/  2    everything at half price

!!!!    second section
+ 10    bonus points
- 10    an item
-  5    another item
*  2    everything at double price
```

is read as a single continuous section.

### whitespace

whitespace - specifically, spaces and tabs - is almost entirely ignored by the tracker. you can add as many new lines as you like, and put as many spaces between things as you like, and for the most part the system will work just fine:

```
+       40          this line
+40 is treated the same as this one
```

there are some exceptions, however. for example, the three lines below are not the same:

```
+ 40 a simple test
+ 4 0 a s i m p l e t e s t
+40asimpletest
```

the first works fine; the second parses "+ 4" and ignores the rest; the third is ignored entirely, as "+40asimpletest" is not a valid operation. a space is required after your actual numbers so you can have things like this:

```
+ 40 10,000 bees in your ears
```

### european decimals

the system treats commas and full stops identically within numbers:

```
+ 4,00
- 4.00
```

so the total here is: 4 - 4 = **0**.

this does mean you can't use commas for large numbers like 6,000,000, but since most CYOAs don't go that high it's not a huge loss.

## additional notes

### saving your data

the tracker autosaves your document half a second after you stop editing it, and should automatically reload your last input when you refresh the page. if you have localStorage disabled, this won't work.

otherwise, the best way to save your build is as a regular text file.

### downloading for offline use

the quickest way to download this for offline use is to use your browser's "save web page" feature and save as "web page, complete", which saves all the necessary .js and .css files to make it work.

## contributing

the cyoa tracker is built entirely on linux and is probably incompatible with a windows development environment.

currently the best way to contribute is to test the tracker yourself and report back with any errors or glitches you find.

### building using task.sh

requirements:

- node.js
- a bash-compatible shell

process:

1. run `npm update`
2. run `zsh task.sh build`, replacing `zsh` with your shell

this runs a pre-written parcel command that builds the project into the docs folder.

### building using parcel directly

task.sh runs the following parcel command:

`parcel build -d docs --public-url "." --log-level 4 --no-autoinstall --no-source-maps --experimental-scope-hoisting src/index.pug`

running that in the project root will produce the same result as `zsh task.sh build`.

### license

All original code in this project is under a GPL3 license.

please donut steal.
