
//  main  //////////////////////////////////////////////////////////////

// modules

import debounce from "lodash/debounce"
import throttle from "lodash/throttle"

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
    value: /^\s*([+\-/=*])\s*(\d+(?:[.,]\d+)?)(?:$|\s)/,
}

//  interface  /////////////////////////////////////////////////////////

// clear editor
const editorClear = (): void => {
    editor.setValue("")
    updateStorage()
}

// push values to output
const displayResults = (results: any, total: number): void => {

    console.log(results, total)

    let sidebar = `
        <h2>results</h2>`

    let footer = `
        <h2>total:</h2>
        <div class="result final">
            <div class="value">${total}</div>
        </div>
        `

    for (let i = 0, max = results.length; i < max; i++) {

        sidebar += `
            <div class="result">
                <span class="line-number">${results[i].start}</span>:
                <span class="title">${results[i].title}</span>
                <span class="value">${results[i].value}</span>
            </div>`

        footer += `
            <div class="result">
                <div class="line-number">${results[i].start}: </div>
                <div class="value">${results[i].value}</div>
            </div>`

    }

    document.querySelector("#sidebar").innerHTML = sidebar

    document.querySelector("#footer .output").innerHTML = footer

}

//  storage  ///////////////////////////////////////////////////////////

const updateStorage = () => {
    console.log("saving...")
    localStorage.setItem("content", editor.getValue())
}

const loadStorage = () => {
    console.log("loading...")
    const storage = localStorage.getItem("content")
    if (storage) { editor.setValue(storage) }
}

//  parser  ////////////////////////////////////////////////////////////

// apply maths to input value
const mathsValue = (current: number, operator: string, number: number): number => {
    switch (operator) {
        case "+":
            current += number
            break
        case "-":
            current -= number
            break
        case "*":
            current *= number
            break
        case "/":
            current /= number
            break
        case "=":
            current = number
            break
    }
    return current
}

// main parser
const grepEditor = (): void => {

    console.log("grepping...")

    // add a generic header to the document to make sure there's
    // actually something there.
    // useful since line numbers start at 1 and arrays start at 0.
    let editorValue = "### start\n" + editor.getValue()

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
        sections[number].push([i, line, header ? header : value])

    }

    // get rid of the secret bonus section if it's empty
    if (sections[0].length === 1) { sections.shift() }

    // now we sum up each section individually
    let results = [], total = 0
    for (let i = 0, max = sections.length; i < max; i++) {

        if (sections[i].length === 1) { continue }

        let section = sections[i]
        let result = {
            start: sections[i][0][0],       // line number
            title: sections[i][0][2][1],    // header text
            value: 0,
        }

        // sum up each line's value, starting *after* the header
        for (let j = 1, max = sections[i].length; j < max; j++) {

            let line = sections[i][j]
            let operator = line[2][1]

            // replace commas with periods for international users
            let number = parseFloat(line[2][2].replace(/,/g, "."))

            // apply this line's value to the group's total
            result.value = mathsValue(result.value, operator, number)

        }

        // push the group's result to the main array
        results.push(result)

        // apply the group's total to the grand total
        total = mathsValue(total, "+", result.value)

    }

    // push final tally to the UI
    displayResults(results, total)

}

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

loadStorage()
grepEditor()

editor.on("change", throttle(updateStorage, 400, { leading: false }))
editor.on("change", debounce(grepEditor, 600))

//  population

editor.focus()
editor.setCursor(0, 0)
