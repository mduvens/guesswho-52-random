let words = {
    yes__: {
      pt: "sim",
      eng: "yes"
    },
    no__: {
      pt: "não",
      eng: "no"
    },
    "btn-rematch": {
      pt: "levanta cartas",
      eng: "cards up"
    },
    question__: {
      pt: "🤖Pergunta🤖",
      eng: "🤖Question🤖"
    },
    whoAmI__: {
      pt: "🤖Quem sou eu?🤖",
      eng: "🤖Who am I?🤖"
    },
    restart__: {
      pt: "Reiniciar",
      eng: "Restart"
    },
    endRematch: {
      pt: "Revanche",
      eng: "Rematch"
    },
    endMessageWIN: {
      pt: "🎊 VITÓRIA 🎊",
      eng: "🎊 VICTORY 🎊"
    },
    endMessageLOSE: {
      pt: "DERROTA",
      eng: "DEFEAT"
    },
    whoItWas: {
      pt: "🤖 era a(o)",
      eng: "🤖 was"
    },
    goodJob: {
      pt: "Bom trabalho!",
      eng: "Good job!"
    },
    btnShowPGuess: {
      pt: "Adivinha",
      eng: "Guess Who"
    },
    guessWhoMain__: {
      pt: "Quem é quem?",
      eng: "Guess Who"
    },
    factsKnownMsg: {
      pt: "Factos",
      eng: "Known Facts"
    },
    askQuestion__: {
      pt: "Pergunta",
      eng: "Ask a question"
    },
    only1Try__: {
      pt: "Apenas 1 tentativa!",
      eng: "Only 1 try!"
    },
    myGuess: {
      pt: "És a/o ",
      eng: "Are you "
    },
    // ATRIBUTES 
    bald: {
      pt: "careca",
      eng: "bald"
    },
    male: {
      pt: "homem",
      eng: "male"
    },
    glasses: {
      pt: "óculos",
      eng: "glasses"
    },
    hat: {
      pt: "chapéu",
      eng: "hat"
    },
    beard: {
      pt: "barba",
      eng: "beard"
    },
    moustache: {
      pt: "bigode",
      eng: "moustache"
    },
    "chin-beard": {
      pt: "pêra",
      eng: "chin-beard"
    },
    "white hair": {
      pt: "cabelo branco",
      eng: "white hair"
    },
    "blond hair": {
      pt: "cabelo loiro",
      eng: "blond hair"
    },
    "red hair": {
      pt: "cabelo ruivo",
      eng: "red hair"
    },
    "brown hair": {
      pt: "cabelo castanho",
      eng: "brown hair"
    },
    "black hair": {
      pt: "cabelo preto",
      eng: "black hair"
    },
    "blue eyes": {
      pt: "olhos azuis",
      eng: "blue eyes"
    },
    "big nose": {
      pt: "nariz grande",
      eng: "big nose"
    },
    "sunglasses": {
      pt: "óculos de sol",
      eng: "sunglasses"
    }
  },
  toggleLanguage = () => {
    "eng" == language ? (language = "pt", btnLanguageHTML.src = "./img/flagPT.png", document.title = "Quem é Quem") : (btnLanguageHTML.src = "./img/flagEN.png", language = "eng", document.title = "Guess Who"), applyLanguage()
  },
  applyLanguage = () => {
    createAtributeHTML(), drawKnownFacts(), testLANGHTML && testLANGHTML.forEach(e => {
      e.innerHTML = words[e.id][language]
    }), myGuessHMTL.innerHTML = `${words.myGuess[language]} ${finalPerson} ?`, best.atribute && (questionAskedHMTL.innerHTML = makePhrase(best.atribute, language)), victory >= 0 && (victory ? (endMessageHMTL.innerHTML = words.endMessageWIN[language], whoItWasHTML.innerHTML = words.goodJob[language]) : (endMessageHMTL.innerHTML = words.endMessageLOSE[language], whoItWasHTML.innerHTML = `${words.whoItWas[language]} <b><i>${computerCard}</i></b> `))
  };