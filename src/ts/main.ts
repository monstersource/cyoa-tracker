//  main  //////////////////////////////////////////////////////////////

//  modules

import debounce from "lodash/debounce"
import throttle from "lodash/throttle"

import codemirror from "codemirror"

import "codemirror/lib/codemirror.css"
import "codemirror/addon/mode/simple"
import "codemirror/addon/scroll/scrollpastend"
import "codemirror/addon/scroll/simplescrollbars.css"
import "codemirror/addon/scroll/simplescrollbars"
import "codemirror/addon/selection/mark-selection"

//  constants

const element = {
    editor: "#editor",
    output: "#output",
}

const number = {
    undoMax: 5,
    delay: 500,
}

//  utilities

//  parser  ////////////////////////////////////////////////////////////

//  functions

const header = (data, options = { check: true }) => {
    if (options.check === true) {

    }
}

// const checkHeader = (line) => {
//     const split = line.trim().split(/\s+/)
//     console.log(split)
//     if (/[#~]/.test(split[0])) {
//         console.log("a header!")
//         return true
//     }
// }

// const whiteSplice = (line) => line.trim().split(/\s+/)

const isHeader = {
}

// let line = "\t= 4,0u00\tace banana pet detana".trim().split(/\s+/)
// if (!/[+\-/=*]/.test(line[0])) {
//     console.log("not correct")
// }
// if (isNaN(line[1].replace(/,/g, ""))) {
//     console.log("not a number")
// }
// console.log(line)

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

editor.setValue(`###\theader test

~~~\tsubheader test

\t\t~~~indent test

+++++++++++++ 4\taoeu
+ 4\taoeu
- 2\ttest
-2test
= 8\tbuttersafe
`)

editor.focus()
editor.setCursor(0, 0)
