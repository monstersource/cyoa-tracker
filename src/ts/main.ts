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

const regex = {
    header: /^[#~]+/,
}

//  utilities

//  parser  ////////////////////////////////////////////////////////////

//  functions

//  returns an array of non-empty lines stripped of whitespace
const splitLines = (content: string): string[] => {
    return content
        .split("\n")
        .filter(line => line)
        .map(line => line.replace(/[^\d\.+\-/=*#~]/g, ""))
}

//  returns the array split into sections based on markup headers
const splitSections = (lines: string[]) => {
    const init = [[{ line: 0, content: null }]]
    let output = init
    let section = 0
    for (let i = 0, max = lines.length; i < max; i++) {
        let line = lines[i]
        if (regex.header.test(line)) {
            if (output !== init) {
                output.push([])
                section++
            }
        }
        console.log(output)
        output[section].push({ line: i, content: line })
    }
    return output
}

const grepEditor = (editorValue: string): void => {

    let lines = editorValue.split("\n")

    for (let i = 0, max = lines.length; i < max; i++) {
        let line = lines[i].split(/\s+/)
        console.log(line)
    }

    console.log(lines)

    // let lines = editorValue.replace(/[ \t]/g, "").split("\n")
    // let sections = [[[0, "###zeroline"]]], sectionNumber = 0
    //
    // for (let i = 0, max = lines.length; i < max; i++) {
    //     let line = lines[i]
    //     // console.log(i + 1, line)
    //     if (/^[#~]+/.test(line)) {
    //         sections.push([])
    //         sectionNumber++
    //         sections[sectionNumber].push([i, line])
    //     }
    //     else {
    //         sections[sectionNumber].push([i, line])
    //     }
    // }
    //
    // sections.forEach(section => {
    //     let filtered = section.filter(line => console.log(line[1]))
    //     console.log(section)
    // }

    // console.log(sections)
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

editor.setValue(`###\t40] header test 40

~~~\tsubheader test

-1000.00 testing these too
-3,000,000 aoeu this shouldn't work

\t\t~~~indent test

+++++++++++++ 4\taoeu
+ 4\taoeu 40
- 2\ttest
-2 test
= 8\tbuttersafe
`)

editor.focus()
editor.setCursor(0, 0)

grepEditor(editor.getValue())
