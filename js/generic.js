const getRandomCard = (array) => {
  return array[Math.floor(Math.random() * (array.length-1))]
}

const makePhrase = (atribute,lang) => {
  if(lang == "eng"){
    if (atribute == "bald" || atribute == "male") return `Is (s)he ${words[atribute][lang]}?`
    else return `Does (s)he have ${words[atribute][lang]}?`
  }
  else{
    if (atribute == "bald" || atribute == "male") return `Ele(a) é ${words[atribute][lang]}?`
    else return `Ele(a) tem ${words[atribute][lang]}?`
  }

  
}
const getRandomBest = array =>{
  if (array.length>1){
    let lucky = Math.floor(Math.random() *array.length);
    return array[lucky];
  }
  else return array[0]
}

const setTotal = (dic) => {
    Object.keys(dic["total"]).forEach(atr => dic["total"][atr] = 0)
    for(var key in dic){  // find Total occurences of each atribute
      if (key == "total") break  
      for (var atribute in dic[key]){
        if (dic[key][atribute])
          dic["total"][atribute]+= 1
      }
    }
    for(var atr in dic["total"])
        if(dic["total"][atr] == 0) delete dic["total"][atr] 
}
let logDictionary = (t, e = "DICIONARY") => {};

const getFrequency = (t, e) => {
  let a = e.total[t],
    o = Object.keys(e).length - 1;
  return ((a * a + (o - a) * (o - a)) / o).toFixed(5)
},
getDifference = (t, e) => {
  let a = e.total[t],
    o = Object.keys(e).length - 1;
  return Math.abs(a - o / 2).toFixed(3)
};