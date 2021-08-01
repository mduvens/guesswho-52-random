guessedPersonHTML.onkeyup = e => {
    if (13 === e.keyCode)
        if (exists) {
            if (computerCard.toUpperCase() == $("#guesswho").val().toUpperCase()) return victory = 1, void endGame(victory);
            victory = 0, endGame(victory)
        } else guessedPersonHTML.value = "Does not exist!", guessedPersonHTML.disabled = !0, setTimeout(() => {
            guessedPersonHTML.value = guessedPerson, guessedPersonHTML.disabled = !1, guessedPersonHTML.focus()
        }, 1e3);
    else {
        var s = guessedPersonHTML.value;
        guessedPerson = s
    }
}

answerYes.onclick = () => {
    playerAnswers[best["atribute"]] = true

    Object.keys(activeCards).forEach(person => { // removing computer cards after asking questions
      if (!(activeCards[person][best["atribute"]]) && person != "total")
        delete activeCards[person]
    })
    setTotal(activeCards)
    logDictionary(activeCards,"ACTIVE CARDS")
  
  }

answerNo.onclick = () => {
    playerAnswers[best["atribute"]] = false
   
    Object.keys(activeCards).forEach(person => { // removing computer cards after asking questions
        if (activeCards[person][best["atribute"]] && person != "total")
        delete activeCards[person]
    })
    setTotal(activeCards)
    logDictionary(activeCards,"ACTIVE CARDS")
}

let checkInput = () => {
        "block" == playerGuessHTML.style.display ? existsvar = setInterval(() => {
            for (var e = 0; e < cards.length; e++)
                if (guessedPerson) {
                    if (guessedPersonHTML.value = guessedPersonHTML.value.toUpperCase(), guessedPerson.toUpperCase() == cards[e].toUpperCase()) {
                        exists = !0, guessedPersonHTML.style.color = "green", playerGuessHTML.style.borderColor = "green";
                        break
                    }
                    exists = !1, guessedPersonHTML.style.color = "red", playerGuessHTML.style.borderColor = "red"
                } else playerGuessHTML.style.borderColor = "white"
        }, 100) : existvar && clearInterval(existvar)
    },
    drawKnownFacts = () => {
        myAnswersHMTL.innerHTML = "", Object.keys(myAnswers).forEach(e => {
            myAnswers[e] ? (colorAtr = "#00cc00", myAnswersHMTL.innerHTML += `<b style="color:${colorAtr}">${atributeImages[words[e].eng]}${words[e][language].toUpperCase()}✔️</b><br>`) : (colorAtr = "#ff0000", myAnswersHMTL.innerHTML += `<b style="color:${colorAtr}">${atributeImages[words[e].eng]}${words[e][language].toUpperCase()} ❌</b><br>`)
        })
    };

let createAtributeHTML = () => {
    selectQuestionHMTL.length = 1 // clear atributes in case we had more people and choose randomly
    let option ;
    
    for(let key in gameCards["total"]){
     
        if(Object.keys(myAnswers).indexOf(key) !== -1) 
            continue

        let word = words[key][language];
        option = document.createElement("option");
        option.text = `${atributeImages[words[key]["eng"]]} ${word.toUpperCase()}`
        option.value = words[key]["eng"]
        selectQuestionHMTL.add(option)
    }
    
    }
cancelRestartHTML.onclick = () => {
    finalRestartHTML.style.display = "none"
}, btnRestartHTML.onclick = () => {
    finalRestartHTML.style.display = "block"
};
const start = () => {
        showHUD(), startGame() 
    },
    hideHUD = () => {
        Object.keys(toFinalHide).forEach(e => {
            toFinalHide[e].style.display = "none"
        })
    },
    showHUD = () => {
        Object.keys(toFinalHide).forEach(e => {
            (turn && "answers" != e || !turn && "questions" != e) && (toFinalHide[e].style.display = "block")
        })
    },
    showFinal = () => {
        finalDivHMTL.style.display = "block"
    };
endRematch.onclick = () => {
    gameoverHTML.style.display = "none", music.play(), startGame()
};
let enableQuestion = () => {
        selectQuestionHMTL.value = "", selectQuestionHMTL.length = 1, createAtributeHTML(), questionsHTML.style.display = "block", answersHTML.style.display = "none"
    },
    enableAnswer = () => {
        questionsHTML.style.display = "none", answersHTML.style.display = "block"
    };
const showPlayerGuess = () => {
        Object.keys(toFinalHide).forEach(e => {
            toFinalHide[e].style.display = "none"
        }), guessedPersonHTML.autofocus = !0, playerGuessHTML.style.display = "block"
    },
    cancelPlayerGuess = () => {
        showHUD(), playerGuessHTML.style.display = "none", guessedPersonHTML.value = ""
    };