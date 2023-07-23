const translateAPIkey = '9fH_W0mxmUPzSh6bXbWBSweF';
const jokeURL = 'https://geek-jokes.sameerkumar.website/api?format=json';
const jtArrayKEY = 'jokeTranslateLocalstorageKey';
const jokePlaceHolder = '[joke]';
let jokeTranslateArray;
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function (){
  M.AutoInit();
  const jokeBtn = $('#download-button');
  const translateBtn = $('#translate-button');
  const clearBtn = $('#clear-storage');

  init();
  jokeBtn.on('click', getJoke);
  translateBtn.on('click', getTranslation);
  clearBtn.on('click', clearLocalstorage);
});

// API ONE:  The Joke
function getJoke(){
  return fetch(jokeURL)
    .then((response) => {
      if (response.status != 200) {
        throw new Error(`Status not 200!!!\t${response}`);
      }
      return response.json();
    })
    .then((data) => {
      // Populate joke field with joke and clear translated field until translate button clicked
      $('#joke').text(data.joke);
      $('#translated').text('');
      return data.joke;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// API TWO:  The translation
function getTranslation(event){
  event.preventDefault();
  // Capture current joke text
  const phrase = $('#joke').text();

  // Catch empty joke text error if present
  if (phrase) {
    fetchTranslation(phrase);
  } else {
    console.log("Failed successfully");
    $('#translated').text("FAILURE:  Joke phrase is empty");
    $('#modal1').modal('open');
    return;
  }
}

// Get the modal
var modal = document.querySelector("modal-content");

// Get the button that opens the modal
var btn = document.querySelector("#myBtn");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  $('#modal1').modal('open');
  $('#joke2').text("MOOOOO");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// (helper).... getTranslation
function fetchTranslation(jokeOG){
  // Abort translation if placeholder detected
  if(jokeOG === jokePlaceHolder){ return;}
  // URL encode joke
  const jokeURLencoded = encodeURIComponent(jokeOG);
  // Build URL for api fetch request
  const requestURL = `https://api.funtranslations.com/translate/yoda.json?text=${jokeURLencoded}&apikey=${translateAPIkey}`;

  fetch(requestURL)
    .then(function(response) {
      if(response.status != 200){
        console.log("TranslateAPI response not 200", response);
        return -1;
      }
      return response.json();
    })
    .then(function(data) {
      let jokeTR;
      if(data == -1){
        jokeTR = "This is a hard-coded string to allow the app to complete";
        console.log("Temporary catch due to too many translate API hits");
      } else { jokeTR = data.contents.translated;}
      // Localstore save of joke/translation pair
      storeRay({jokeOG, jokeTR});
      $('#joke2').text("Original joke: " + jokeOG);
      $("#translated").text(jokeTR);
      $('#modal1').modal('open');
    });
}

function storeRay(dPair){
  // Logic to prevent duplicates
  let found = false;
  jokeTranslateArray.forEach(element => {
    if(element.jokeOG === dPair.jokeOG){
      found = true;
      return;
    }
  });
  if(found){ return;}

  // If new joke, add to array and store
  jokeTranslateArray.push(dPair);
  localStorage.setItem(jtArrayKEY, JSON.stringify(jokeTranslateArray));
  buildStoredJokeCards();
}

function init(){
  // Populate joke/translated html with placeholders
  $('#joke').text(jokePlaceHolder);
  $('#translated').text('[translation]');

  // Get or create array for holding joke/translation pairs
  const rayStr = localStorage.getItem(jtArrayKEY);
  if(rayStr){
    jokeTranslateArray = JSON.parse(rayStr);
  } else {
    jokeTranslateArray = new Array();
  }
  buildStoredJokeCards();
}

function clearLocalstorage(){
  localStorage.clear();
  init();
}

function buildStoredJokeCards(){
  // Clear any previous/current appended html elements
  $('#stored-jokes').empty();
  // If array empty abort card build
  if(!jokeTranslateArray){ return;}

  // Build row div to hold stored joke cards
  let row = $('<div>');
  row.addClass('row');

  // Build card for each joke
  for(let index = 0; index < jokeTranslateArray.length; index++){
    let col = $('<div>');
    col.addClass('col s12 m6 card');
  
    let card = $('<div>');
    card.addClass('card blue-grey darken-3');
  
    let cardContent = $('<div>');
    cardContent.addClass('card-content white-text');
  
    let p = $('<p>');
    p.text(jokeTranslateArray[index].jokeOG);
  
    cardContent.append(p);
    card.append(cardContent);
    col.append(card);
    row.append(col);
  }

  // Delegated click functionality to repopulate joke/translation field from localstorage
  row.on('click', '.col', function(){
    let retrievedJoke = $(this).text();
    // Find stored joke, returns the joke/translation pair
    let retrievedJkTrPair = jokeTranslateArray.find(function (e){
      return e.jokeOG === retrievedJoke;
    });
    // Catch unexpected null result
    if(!retrievedJkTrPair){
      console.log("Error, no joke matched in stored array: ", retrievedJoke);
      return;
    }
    // Populate joke/translated fields with results
    $('#joke').text(retrievedJoke);
    $('#joke2').text("Original joke: " + retrievedJoke);
    $('#translated').text(retrievedJkTrPair.jokeTR);// + "test part to see that html updates");
    $('#modal1').modal('open');
  });

  // Append the built joke cards to the section/container for storing joke cards
  $('#stored-jokes').append(row);
}