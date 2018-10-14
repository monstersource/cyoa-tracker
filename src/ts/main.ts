//  modules  ///////////////////////////////////////////////////////////

import debounce from "lodash/debounce"
import throttle from "lodash/throttle"

//  constants  /////////////////////////////////////////////////////////

const element = {
    editor: "#editor textarea",
    output: "#output",
}

const regex = {
    header: /^\s*([#~]+)\W*(\d+(\.\d+)?)?/,
    item: /^\s*([~\-/=\*])\s*(\d+(\.\d+)?)/,
}

//  history  ///////////////////////////////////////////////////////////

let undoStack = []
let redoStack = []

const undoPush = throttle(function(event) {
    console.log(this)
    undoStack.push(this)
}, 500, { leading: false })

const undoPop = (function(event) {
    return undoStack.pop()
})

//  grep  //////////////////////////////////////////////////////////////

const grep = (content: string) => {
    if (typeof content !== "string") { return false }
    const lines = content.split("\n")
    console.log(lines)
}

const update = debounce((event) => {
    grep(event.target.value)
}, 500)

//  editor  ////////////////////////////////////////////////////////////

let editor: HTMLInputElement = document.querySelector(element.editor)

// console.log(editor)

editor.addEventListener("keydown", function(event) {

    redoStack = []

    console.log(event)

    //  gather intel
    const start = this.selectionStart
    const end = this.selectionEnd
    const before = this.value.substring(0, start)
    const after = this.value.substring(end)

    //  input handlers

    //  insert tabs instead of switching focus
    if (event.key === "Tab") {
        event.preventDefault()
        this.value = before + "\t" + after
        this.selectionEnd = start + 1
    }

    //  auto-indent on enter
    //  clear auto-indent if line is empty
    else if (event.key === "Enter") {
        event.preventDefault()
        let lines = before.split("\n")
        let current = lines[lines.length -1]
        let indent = 0
        while (current.charAt(indent) === "\t") { indent++ }
        this.value = before + "\n" + "\t".repeat(indent) + after
        this.selectionEnd = start + 1 + indent
    }

    //  undo logic

    if (event.key.length === 1 || event.key === "Tab" || event.key === "Backspace" || event.key === "Delete" || event.key == "Enter") {
        console.log("test")
    }

})

editor.addEventListener("propertychange", undoPush)

editor.value = `####\tDIVINE TRIALS

=750\tHELL OR HIGH WATER EDITION

~~~~\tIMMORTALITY

\trebirth by death
\tcast off humanity

~~~~\tRACE

\tautomaton

~~~~\tBODY

\thermaphrodite
\tmuscular
\ttall
\tnormal genital
\tlarge breasts

~~~~\tMISCELLANEOUS OPTIONS

\teyes
\tmasculine
\tpointy ears
\tenhanced orifices
\tbody accessories
\tstoic
\tperky
\thairless
\tluscious lips

####\tENHANCEMENTS

~~~~\tDRAWBACKS

+ 30\tuse protection
+ 30\tdeviously cursed loot
+ 30\tcruel and unusual
+ 40\tin the hole
+ 25\tpublic menace
+ 45\tbreeding program
+ 40\tevolving flora
+ 75\tno way home
+300\tarmless (every limb)
+ 45\tgated
+ 35\tgame over
+ 40\tworld of whorecraft
+ 40\twrong genre buddy
+ 45\teasily bound
+ 90\tchallenge run
+ 35\ttally ho
+ 65\talternate start
+ 70\tmagic overhaul

+ 45\tsoulmate
+ 40\tthe spirit
+ 55\tthe broker
+ 45\tthe bitch
+ 60\tdemon queen

+100\tfree for all

~~~~\tBOONS

- 40\tstockholm syndrome
- 25\tready to roll
- 20\tbeautiful world
- 40\tleadership
- 40\tpawn
- 40\tpresence
- 40\taura
- 30\tsex god
- 25\tseduction
- 25\tprivacy
- 35\trelentless
- 45\tpoison-proof
- 25\tlazy body-building
- 40\tteacher's pet
- 20\terotic norm
- 25\tharem
- 15\tsod cancer
- 10\tno bully
- 35\tpriorities
- 30\tmeta human
- 25\tinfiltrator
- 20\tindulgence
-  0\thud (automaton)
- 40\tking of kong
- 30\tgratz
- 30\t100% match
- 30\tchikan
- 15\tnatural high
- 30\tsoulbound
- 40\thearts and minds
- 30\tfluffsville
- 20\tdemographic shift
- 50\tcursed with awesome
- 40\tmary sue
- 30\tdicked over
- 10\ttastes like snozzberries
- 30\tai friend

- 30\talways be prepared
- 40\tyou are not alone

- 30\tsidekick
-  5\tfrench maid
-  5\ttoby

~~~~\tPOWERS

+200\tashe bonus

- 50\tstrength
- 50\tendurance
- 50\tdexterity
- 50\tcharisma
- 50\twillpower
- 50\tintelligence
- 50\tluck

- 30\tstamina
- 80\tchakra
- 55\tmartial forms
- 25\tacrobat

- 30\tmuse
- 20\tperformance
- 25\ttextiles
- 40\tsmithing
- 30\ttechnophile
- 25\twordsmith
- 15\teroticism

####\tCOLLECTIONS

~~~~\tITEMS

- 60\tcustom robot x4

-  7\ttough love
- 10\tworld history volume 1
- 10\tbestiary
-  8\tusidore's tome
- 27\tcrown of the great adversary
-  4\tsanitation distributor
- 25\tarmour of resistance
- 26\tking's app
-  5\tstarter kit
-  3\tpersonal symphony
- 27\tprosthetic limbs

- 14\thomunculus

/= 2\talways be prepared

~~~~\tCOMPANIONS

- 15\traviness de la vien
- 15\tkinvara
- 25\talex

- 25\tebony d'arc
- 15\tsaika lovelace
- 20\taranea
- 15\tzalera
- 15\tmax
- 15\tabigail
- 10\tmisty
- 15\teris
- 20\tcleyra
- 20\taneki
- 15\tluciara valoran
- 20\tcassandra
- 10\tangel
-  5\tsuzy blake
- 15\thydrana vesp
- 20\tzoe lowell
- 15\teurasia
- 20\tkitty oxford
- 25\tcindy
- 15\tsabrina malkavia
- 15\tgalana gabriela
-  0\t???
- 20\tnex
- 20\torianna valoran
- 10\tcrazy fucking armour
- 20\txu yuan
- 20\tlirael
- 20\tchika
- 15\tluxy
- 20\tlarissa
- 25\tminerva
- 25\tagrias
- 25\tdellaria

-  0\tautoclave mk 6
- 15\tmechasaurus
- 25\tmori
-  0\tsailor lune

=/ 2\tyou are not alone

~~~~\tQUESTS

####\tPLACES

~~~~\tHOME

- 20\tcastle gabranth

~~~~\tWORLD

\tGielinor

####\tOUTCOME

~~~~\tVALERIA
\tlewd her

~~~~\tCHRONA
\tecstasy

~~~~\tTHE DEMONS
\ttotal dominance

~~~~\tAMELIA
\tlimiter

~~~~\tEVELYN
\tfun with clones II

~~~~\tASHE
\tmy wife is a degenerate

~~~~\tSCHIERKE
\twon't you come and play with me

~~~~\tAGRIAS
\tfull-blown lewd

~~~~\tRIAS
\tpersonal attendant

~~~~\tREWARDS

\tspirit lord
\tmajor player
\tangelic hosts
\tdrawback removal
`
