const keypadContainer = document.querySelector(".keypad-container")
const startKnapp = document.querySelector(".start-knapp")
const countdown = document.querySelector(".countdown")
const overlayOverStartButton = document.querySelector(".overlay-over-start-button")
const overlayOverStartButton2 = document.querySelector(".overlay-over-start-button-2")
const theRandomNumber = document.querySelector(".the-random-number")
const numberFromInput = document.querySelector(".number-from-input")
const deleteButton = document.getElementById("delete-button")
const enterButton = document.getElementById("enter-button")

let freeze = true
let begin = 0
let end = 0
let timeSpent = 0
let subtestIndex = 0
let charAt = 0



const tests = [
  {
    tall: 2067,
    keybaord: "6951023784",
    timeSpent: 0,
    feil: 0
  },
  {
    tall: 8170,
    keybaord: "0896154237",
    timeSpent: 0,
    feil: 0
  },
  {
    tall: 7284,
    keybaord: "3027948165",
    timeSpent: 0,
    feil: 0
  },
  {
    tall: 4165,
    keybaord: "4607258193",
    timeSpent: 0,
    feil: 0
  }
]



const inputs = [
  '<div id="tall-0" class="input-tall" onclick="typeInNumber(0)" value="0">0</div>',
  '<div id="tall-1" class="input-tall" onclick="typeInNumber(1)" value="1">1</div>',
  '<div id="tall-2" class="input-tall" onclick="typeInNumber(2)" value="2">2</div>',
  '<div id="tall-3" class="input-tall" onclick="typeInNumber(3)" value="3">3</div>',
  '<div id="tall-4" class="input-tall" onclick="typeInNumber(4)" value="4">4</div>',
  '<div id="tall-5" class="input-tall" onclick="typeInNumber(5)" value="5">5</div>',
  '<div id="tall-6" class="input-tall" onclick="typeInNumber(6)" value="6">6</div>',
  '<div id="tall-7" class="input-tall" onclick="typeInNumber(7)" value="7">7</div>',
  '<div id="tall-8" class="input-tall" onclick="typeInNumber(8)" value="8">8</div>',
  '<div id="tall-9" class="input-tall" onclick="typeInNumber(9)" value="9">9</div>'
]



function startTesten(seconds) {
  changeKeybaord()
  displayOverlayOverStartButton()
  startCountdown(seconds)
}



function changeKeybaord() {
  keypadContainer.innerHTML = `
    <div class="row-1 row"> 
      ${inputs[tests[subtestIndex].keybaord.charAt(0)]}
      ${inputs[tests[subtestIndex].keybaord.charAt(1)]}
      ${inputs[tests[subtestIndex].keybaord.charAt(2)]}
    </div>

    <div class="row-2 row">
      ${inputs[tests[subtestIndex].keybaord.charAt(3)]}
      ${inputs[tests[subtestIndex].keybaord.charAt(4)]}
      ${inputs[tests[subtestIndex].keybaord.charAt(5)]}
    </div>

    <div class="row-3 row">
      ${inputs[tests[subtestIndex].keybaord.charAt(6)]}
      ${inputs[tests[subtestIndex].keybaord.charAt(7)]}
      ${inputs[tests[subtestIndex].keybaord.charAt(8)]}
    </div>

    <div class="row-4 row">
      <div id="delete-button" onclick="remove()" class="input-tall" value="d">Delete</div>
      ${inputs[tests[subtestIndex].keybaord.charAt(9)]}
      <div id="enter-button" onclick="nextNumber()" class="input-tall" value="e">Enter</div>
    </div>`
}



function displayOverlayOverStartButton() {
  overlayOverStartButton.style.display = "block"
}



function startCountdown(seconds) {
  if (seconds < 0) return hideButtons()
  countdown.innerText = seconds

  function timeoutHandler() {
    seconds--
    startCountdown(seconds)
  }

  setTimeout(timeoutHandler, 1000)
}



function hideButtons() {
  overlayOverStartButton2.style.display = "none"
  startKnapp.style.display = "none"
  countdown.style.display = "none"

  setTimeout(showNumber, 2000)
}



function showNumber() {
  if (tests[subtestIndex] === undefined) return endTest()

  theRandomNumber.innerText = tests[subtestIndex].tall
  subtestIndex++
  freeze = false
  begin = Date.now()
}



function remove() {
  if (!(startKnapp.style.display == "none")) return 
  if (freeze == true) return

  numberFromInput.style.backgroundColor = "rgba(255, 255, 255, 0.897)"
  numberFromInput.innerText = numberFromInput.innerText.slice(0, numberFromInput.innerText.length - 1)
}



function nextNumber() {
  if (!(startKnapp.style.display == "none")) return 
  if (freeze == true) return

  if (theRandomNumber.innerText == numberFromInput.innerText) {
    correctAnswer()
  } else {
    tests[subtestIndex - 1].feil = tests[subtestIndex - 1].feil + 1
    numberFromInput.style.backgroundColor = "rgb(166, 111, 255)"
  }
}



function typeInNumber(number) {
  if (!(startKnapp.style.display == "none")) return 
  if (freeze == true) return

  numberFromInput.style.backgroundColor = "rgba(255, 255, 255, 0.897)"
  numberFromInput.innerText += number
  charAt = numberFromInput.innerText.length - 1

  if (numberFromInput.innerText.charAt(charAt) != theRandomNumber.innerText.charAt(charAt)) {
    tests[subtestIndex - 1].feil = tests[subtestIndex - 1].feil + 1
    numberFromInput.style.backgroundColor = "rgb(166, 111, 255)"
  }
}



function correctAnswer() {
  end = Date.now()
  timeSpent = (end - begin) / 1000
  freeze = true
  tests[subtestIndex - 1].timeSpent = timeSpent
  numberFromInput.style.backgroundColor = "rgba(21, 255, 0, 0.692)"
  resetKeypad()
  setTimeout(hideNumbers, 2000)
  setTimeout(showNumber, 4000)
}



function hideNumbers() {
  numberFromInput.innerText = ""
  theRandomNumber.innerText = ""
  numberFromInput.style.backgroundColor = "rgba(255, 255, 255, 0.897)"
  if (tests[subtestIndex] === undefined) return theRandomNumber.innerText = "Du er nå ferdig med test 1, del 1/4"
  changeKeybaord()
}



function endTest() {
  let temp = []

  for (let i = 0; i < tests.length; i++) {
    temp.push({time: tests[i].timeSpent, feil: tests[i].feil})
  }

  console.table(temp)
}



function resetKeypad() {
  keypadContainer.innerHTML = `
    <div class="row-1 row">
      <div id="tall-1" class="input-tall" onclick="typeInNumber(1)" value="1"></div>
      <div id="tall-2" class="input-tall" onclick="typeInNumber(2)" value="2"></div>
      <div id="tall-3" class="input-tall" onclick="typeInNumber(3)" value="3"></div>
    </div>

    <div class="row-2 row">
      <div id="tall-4" class="input-tall" onclick="typeInNumber(4)" value="4"></div>
      <div id="tall-5" class="input-tall" onclick="typeInNumber(5)" value="5"></div>
      <div id="tall-6" class="input-tall" onclick="typeInNumber(6)" value="6"></div>
    </div>

    <div class="row-3 row">
      <div id="tall-7" class="input-tall" onclick="typeInNumber(7)" value="7"></div>
      <div id="tall-8" class="input-tall" onclick="typeInNumber(8)" value="8"></div>
      <div id="tall-9" class="input-tall" onclick="typeInNumber(9)" value="9"></div>
    </div>

    <div class="row-4 row">
      <div id="delete-button" onclick="remove()" class="input-tall" value="d">Delete</div>
      <div id="tall-0" class="input-tall" onclick="typeInNumber(0)" value="0"></div>
      <div id="enter-button" onclick="nextNumber()" class="input-tall" value="e">Enter</div>
    </div>
  `
}
