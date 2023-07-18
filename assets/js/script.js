const translateAPIkey = '9fH_W0mxmUPzSh6bXbWBSweF';
const jokeURL = 'https://geek-jokes.sameerkumar.website/api?format=json';
const jtArrayKEY = 'jokeTranslateLocalstorageKey';
let jokeTranslateArray;
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const jokeBtn = $('#download-button');
  const translateBtn = $('#translate-button');
  const clearBtn = $('#clear-storage');
  const ray = $('#ray'); // Remove on final submission most likely

  init();
  getJoke();
  jokeBtn.on('click', getJoke);
  translateBtn.on('click', getTranslation);
  clearBtn.on('click', clearLocalstorage);
  ray.on('click', printRay); // Remove on final submission most likely
});

// API ONE:  The Joke
function getJoke() {
  return fetch(jokeURL)
    .then((response) => {
      if (response.status != 200) {
        throw new Error(`Status not 200!!!\t${response}`);
      }
      return response.json();
    })
    .then((data) => {
      const jokeText = $('#joke');
      jokeText.text(data.joke);
      $('#translated').text('');
      return data.joke;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// API TWO:  The translation
function getTranslation(event) {
  event.preventDefault();
  // Capture current joke text
  const phrase = $('#joke').text();

  if (phrase) {
    fetchTranslation(phrase);
  } else {
    alert('please enter a sentence for master yoda');
    return;
  }
}

// (helper).... getTranslation
function fetchTranslation(jokeOG) {
  // URL encode joke
  const jokeURLencoded = encodeURIComponent(jokeOG);
  // Build URL for api fetch request
  const requestURL = `https://api.funtranslations.com/translate/yoda.json?text=${jokeURLencoded}&apikey=${translateAPIkey}`;//
  // Jquery element for translated joke output
  const translatedText = $('#translated');
  fetch(requestURL)
    .then(function(response) {
      if(response.status != 200){
        console.log("TranslateAPI response not 200", response);
      }
      return response.json();
    })
    .then(function(data) {
      let jokeTR;
      if(!data[0]){
        jokeTR = "This is a hard-coded string to allow the app to complete";
        console.log("Temporary catch due to too many translate API hits");
      } else { jokeTR = data.contents.translated;}
      // Localstore save of joke/translation pair
      storeRay({jokeOG, jokeTR});
      translatedText.text(jokeTR);
    })
}

function storeRay (dPair){
  jokeTranslateArray.push(dPair);
  localStorage.setItem(jtArrayKEY, JSON.stringify(jokeTranslateArray));
}

function init(){
  const rayStr = localStorage.getItem(jtArrayKEY);
  if(rayStr){
    jokeTranslateArray = JSON.parse(rayStr);
  } else {
    jokeTranslateArray = new Array();
  }
  // Build html buttons or something here (or do this somewhere else)
}

function clearLocalstorage() {
  localStorage.clear();
  init();
}

function printRay() { // Remove on final submission most likely
  console.log("PRINTING CURRENT RAY\nRay has ", jokeTranslateArray.length, " joke/translation pairs\n", jokeTranslateArray);
  if(!jokeTranslateArray){
    console.log("Array empty");
    return;
  }
  // for(let index = 0; index < jokeTranslateArray.length; index++){
  //   console.log("JOKE: ", jokeTranslateArray[index].jokeOG, "\tJKTR: ", jokeTranslateArray[index].jokeTR);
  // }
}

M.AutoInit();