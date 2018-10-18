//  main  //////////////////////////////////////////////////////////////

// modules

import debounce from "lodash/debounce"
import throttle from "lodash/throttle"
import reduce   from "lodash/reduce"

import codemirror from "codemirror"

import "codemirror/lib/codemirror.css"
import "codemirror/addon/mode/simple"
import "codemirror/addon/scroll/scrollpastend"
import "codemirror/addon/scroll/simplescrollbars.css"
import "codemirror/addon/scroll/simplescrollbars"
import "codemirror/addon/selection/mark-selection"

// constants

const element = {
    editor: "#editor",
    output: "#output",
}

const number = {
    undoMax: 5,
    delay: 500,
}

const regex = {
    header: /^\s*[#~]+\s+(.*)$/,
    value: /^\s*([+\-/=*])\s*(\d+(?:[.,]\d+)?)/,
}

//  parser  ////////////////////////////////////////////////////////////

const grepEditor = (editorValue: string): void => {

    // add a generic header to the document to make sure there's
    // actually something there.
    // useful since line numbers start at 1 and arrays start at 0.
    editorValue = "### start\n" + editorValue

    // split editor content
    let lines = editorValue.split("\n")

    // create grouped array of sections with regex results
    let sections = [], number = -1
    for (let i = 0, max = lines.length; i < max; i++) {

        // trim whitespace
        let line = lines[i].trim()

        // get regex results
        let header = line.match(regex.header)
        let value = line.match(regex.value)

        // ignore the line if it's not important
        if (!header && !value) { continue }

        // create a new section if it's a header
        if (header) {
            sections.push([])
            number++
        }

        // push the result to the sections array
        sections[number].push([i, line, header, value])
    }

    // get rid of the secret bonus section if it's empty
    if (sections[0].length === 1) { sections.shift() }

    console.log(sections)

}

//  editor  ////////////////////////////////////////////////////////////

//  syntax highlighting

//  editor  ////////////////////////////////////////////////////////////

//  creation

const editor = codemirror(document.querySelector(element.editor), {
    autofocus: true,
    cursorScrollMargin: 6,
    dragDrop: false,
    indentUnit: 8,
    indentWithTabs: true,
    lineNumbers: true,
    lineSeparator: "\n",
    lineWrapping: true,
    mode: "cyoa",
    scrollbarStyle: "simple",
    scrollPastEnd: true,
    showCursorWhenSelecting: true,
    styleSelectedText: true,
    tabSize: 8,
    undoDepth: 100,
    viewportMargin: 6,
})

//  population

editor.setValue(`### test further
    + 8
- 4




    ###\t40] header test 40
~~~\tsubheader test
a line with nothing on it, for testing.
-1000.00 testing these too
-3,000,000 aoeu this shouldn't work
\t\t~~~indent test
+++++++++++++ 4\taoeu
+ 4\taoeu 40
- 2\ttest
-2 test
### another section
= 8\tbuttersafe
`)

editor.focus()
editor.setCursor(0, 0)

grepEditor(editor.getValue())
