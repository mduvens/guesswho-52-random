// sorry for anyone who tries to understand this 

const cardsNum = document.querySelectorAll('.slot').length;
const cardAssigned = document.getElementById('card-assigned');
const btnRematch = document.getElementById('btn-rematch');

const getRand = limit => Math.round(Math.random() * limit);

// cardAssigned.className = 'card card--assigned card-' + getRand(cardsNum);

// btnRematch.onclick = () => {
//   cardAssigned.className = 'card card--assigned card-' + getRand(cardsNum);
// };

//*************************M*************************/
const answerYes = document.getElementById("answerYES"),
  answerNo = document.getElementById("answerNO"),
  questionsHTML = document.getElementById("questions"),
  answersHTML = document.getElementById("answers"),
  endRematch = document.getElementById("endRematch"),
  gameoverHTML = document.getElementById("gameover"),
  endMessageHMTL = document.getElementById("endMessage"),
  questionAskedHMTL = document.getElementById("questionAsked"),
  guessedPersonHTML = document.getElementById("guesswho"),
  myAnswersHMTL = document.getElementById("myAnswers"),
  selectQuestionHMTL = document.getElementById("selectQuestion"),
  finalDivHMTL = document.getElementById("finalDiv"),
  myGuessHMTL = document.getElementById("myGuess"),
  introHTML = document.getElementById("intro"),
  factsKnownHTML = document.getElementById("factsKnown"),
  btnShowPGuess = document.getElementById("btnShowPGuess"),
  playerGuessHTML = document.getElementById("playerGuess"),
  whoItWasHTML = document.getElementById("whoItWas"),
  soundLogoHTML = document.getElementById("soundLogo"),
  playerWinsHTML = document.getElementById("playerWins"),
  myWinsHTML = document.getElementById("myWins"),
  finalNOHTML = document.getElementById("finalNO"),
  playerCheatHTML = document.getElementById("playerCheat"),
  btnLanguageHTML = document.getElementById("btnLanguage"),
  testLANGHTML = document.querySelectorAll(".testLANG"),
  btnRestartHTML = document.getElementById("btnRestart"),
  finalRestartHTML = document.getElementById("finalRestart"),
  cancelRestartHTML = document.getElementById("cancelRestart"),
  computerCardsHTML = document.getElementById("computerCards")
  




// audio 
let audioVolume = 0.4
let audios = []
let music = new Audio("sounds/wiimusic.mp3");
music.volume = 0
music.loop = true
let victoryAudio = new Audio("sounds/quizVictory.wav"); // I think wav is already supported  by all modern browsers
victoryAudio.volume = audioVolume
audios.push(victoryAudio)
let defeatAudio = new Audio("sounds/defeat.mp3");
defeatAudio.volume = audioVolume
audios.push(defeatAudio)
let toggleMusic = () => {
  if (music.volume) {
    soundLogoHTML.src = "./img/soundOFF.png"
    music.volume = 0
  } else {
    if (music.paused) music.play()
    music.volume = 0.3
    soundLogoHTML.src = "./img/soundON.png"
  }
}

let toClean = [questionAskedHMTL, myAnswersHMTL] // test
let toFinalHide = {
  "answers": answersHTML,
  "questions": questionsHTML,
  "facts": factsKnownHTML
}
let frequencies, playerAnswers, myAnswers,
   cards, computerCard;
let best = {};
let questionValue = null;
let answerValue = null;
let finalAnswerValue = null;
let timevar;
let existvar;
let guessedPerson
let exists = false
let peopleLeft;
let playerCardIndex;
let boolWhoStarts = true;
let turn = true;
let victory = -1
let finalPerson;
let language = "eng";
let boolMyAnswers = true;
let playerWins = 0;
let myWins = 0;
                    

let getQuestionValue = (value) => {
  questionValue = value
}
let getAnswerValue = (value) => {
  answerValue = value
}
let gameCards;
let spinner = document.getElementsByClassName('lds-ring')[0]
let startGame = () => {
  btnRematch.click();
  victory = -1
  playerCardIndex = getRand(cardsNum)
  cardAssigned.className = 'card card--assigned card-' + playerCardIndex; // show player assigned card
  activeCards = {}
  frequencies = {}
  playerAnswers = {}
  myAnswers = {}
  finalAnswerValue = null
  toClean.forEach(e => e.innerHTML = "")
  guessedPersonHTML.value = ""
  guessedPerson = ""

  setRandomCards()
 
  gameCards = JSON.parse(JSON.stringify(activeCards))

 

  createAtributeHTML()
  showHUD()

  play(boolWhoStarts)
  boolWhoStarts = !boolWhoStarts



}
let endGame = win => {
  hideHUD()
  finalDivHMTL.style.display = "none"
  playerGuessHTML.style.display = "none"
  if (win) {
    music.pause()
    victoryAudio.play()
    playerWins += 1
    playerWinsHTML.innerHTML = playerWins
    endMessageHMTL.innerHTML = words["endMessageWIN"][language]
    whoItWasHTML.innerHTML = words["goodJob"][language]
    endMessageHMTL.style.color = "#00dd00"

  } else {
    defeatAudio.play()
    music.pause()
    myWins += 1
    myWinsHTML.innerHTML = `${myWins}`
    endMessageHMTL.innerHTML = words["endMessageLOSE"][language]
    whoItWasHTML.innerHTML = `${words["whoItWas"][language]} <b><i>${computerCard}</i></b> `

    endMessageHMTL.style.color = "red"

  }
  gameoverHTML.style.display = "block"
}
// gets the best question, gets null if there is only 1 person left
let getBestQuestion = () => {
  frequencies = {}
  let lowest = [ // array for capturing equal frequencies
    ["master", 100]
  ]
  if (Object.keys(activeCards).length > 2) {
    Object.keys(activeCards["total"]).forEach(atrib => { // check the lowest frequency and store in array (in case there is more than one)
      if(!playerAnswers[atrib]){
        value = frequencies[atrib] = getFrequency(atrib, activeCards);
        value == lowest[0][1] ? lowest.push([atrib, value]) : 0
        if (value < lowest[0][1]) {
          lowest = []
          lowest.push([atrib, value])
        }
      }
     
    })
    bestAtribute = getRandomBest(lowest)[0]
    return {
      atribute: bestAtribute,
      question: makePhrase(bestAtribute, language)
    }
  } else {
    return {
      atribute: null,
      question: `${Object.keys(activeCards)}`
    }
  }

}


let getFinalAnswerValue = (value) => {
  if (value == "yes")
    finalAnswerValue = value
  else {
    if (cards[playerCardIndex] == finalPerson) { // check if player is lying
      playerCheatHTML.style.display = "block"
      setTimeout(() => {
        playerCheatHTML.style.display = "none"
      }, 1000)
    } else {
      victory = 1
      endGame(victory)
    }
  }
}
// Check asked question and add the response to the canvas
function checkQuestion(atr) {
  if (atr) {
    myAnswersHMTL.innerHTML = ''
    myAnswers[atr] = people[computerCard][atr]
    drawKnownFacts()
    return {
      atribute: atr,
      answer: myAnswers[atr]
    }

  } else return {
    atribute: null,
    answer: null
  }
}

let getNumberOfCardsLeft = () => {
  let total = 0;
  for(var card in activeCards){
    if(card != 'total') total++;
  }
  return total;
}

let myMove = () => {
  // check how many people are left
  best = getBestQuestion() // get question, gets null if there is only 1 person left

  //wait for answer
  if (best["atribute"] == null) {

    for (var key in activeCards) {
      if (key != "total") finalPerson = key; // get name of person left
    }
    myGuessHMTL.innerHTML = `${words["myGuess"][language]} ${finalPerson} ?`
    hideHUD()
    showFinal()
    timevar = setInterval(() => { // wait for player to confirm our victory 
      if (finalAnswerValue) {
        finalDivHMTL.style.display = "none"
        clearInterval(timevar)
        victory = 0
        endGame(victory)
      }
    }, 500) // check 2 times per second
  } else {
    stringQuestion = `${best["question"]}`
    questionAskedHMTL.innerHTML = stringQuestion;
    enableAnswer()
    timevar = setInterval(() => {
      if (answerValue) {
        clearInterval(timevar)
        turn = !turn
        play(turn)
      }
    }, 500)
  }

}

let playerMove = () => {
  enableQuestion()
  timevar = setInterval(() => {
    if (questionValue) {
      checkQuestion(questionValue)
      clearInterval(timevar)
      turn = !turn
      play(turn)
    }
    checkInput()

  }, 500)


}

let roundTime = 30;
let timeleft = roundTime;
let timeleftHTML = document.getElementById('timeleft');
let timeleftDivHTML = document.getElementById('timeleftDiv');
let timeoutDivHTML = document.getElementById('timeoutDiv');
let blockDivHTML = document.getElementById('blockDiv');

let playTime;
let waitTime = 2;
let timmedOut = false;

// main play function
let play = (playerTurn) => {
  questionValue = null
  answerValue = null
  peopleLeft = 0
  computerCardsHTML.innerHTML  = `${getNumberOfCardsLeft()} Cards`
  clearInterval(playTime);
  
  if(timmedOut){
    timeleft = roundTime+waitTime
    timmedOut = false
  }
  else{
    timeleft = roundTime
  }

  timeleftHTML.innerHTML = timeleft;

  if(Object.keys(activeCards).length - 1 !== 1 || turn){
    playTime = setInterval(() => {
      timeleftHTML.innerHTML = --timeleft;
      if(timeleft <= 5){
        timeleftHTML.style.color = "red"
      }
      else if(timeleft <= 10){
        timeleftHTML.style.color = "orange"
      }
      else if(timeleftHTML.style.color !== "white"){
        timeleftHTML.style.color = "white"
      }
      
      if(timeleft === 0){
        timmedOut = true;
        timeleft = roundTime+waitTime
        clearInterval(timevar);
        clearInterval(playTime);
        timeleftDivHTML.style.display = "none"
        timeoutDivHTML.style.display = "block"
        blockDivHTML.style.display = "block"
        
        // Automatic answer (timeout)
        if(!turn){
          activeCards[cards[playerCardIndex]][best["atribute"]] ? answerYes.click() : answerNo.click()
        }
        
        turn = !turn
        play(turn)
        
        setTimeout(() => {
          
          timeleftDivHTML.style.display = "block"
          timeoutDivHTML.style.display = "none"
          blockDivHTML.style.display = "none"
  
        },waitTime * 1000)
        
      }
    },1000)
  }
 

  if (playerTurn) {
    turn = true
    playerMove()
  } else {
    turn = false
    myMove()
  }
  firstPlay = false;

}


const setRandomCards = () => {
  let root = document.documentElement;
  let names = Object.keys(people);
  let randomCards = []
  const finalDict = {}
  let positions = []

  // Create all possible positions:  0,0 to 9,4
  for(let height = 0; height < 10; height++){
    for(let width = 0; width < 5; width++){
          positions.push([width,height])
      }
  }
  
  // Create an array with the position and respective person
  for(let i = 0; i< positions.length; i++){
    randomCards.push([names[i],positions[i]])
  }

  // Shuffle array so we choose first 24 people randomly
  randomCards = shuffleArray(randomCards);
  
  // Set cards in place && create dictionary with selected cards
  for(let i = 0; i < 24 ; i++){
    let name = randomCards[i][0]
    let position = randomCards[i][1]
    finalDict[name] = position;
    root.style.setProperty('--width-' + i, position[0]);    
    root.style.setProperty('--height-' + i, position[1]);
  }

  
  cards = Object.keys(finalDict)
  computerCard = getRandomCard(cards)

  cards.forEach(person => {
    activeCards[person] = people[person]
  })

  activeCards.total = people.total
  setTotal(activeCards)
 
}


const shuffleArray = (array) => {
  let oldElement;
  for (let i = array.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = array[i];
    array[i] = array[rand];
    array[rand] = oldElement;
  }
  return array;
} 
