const translateAPIkey = '9fH_W0mxmUPzSh6bXbWBSweF';
const jokeURL = 'https://geek-jokes.sameerkumar.website/api?format=json';

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const jokeBtn = $('#download-button');
  const translateBtn = $('#translate-button');

  getJoke();
  jokeBtn.on('click', getJoke);
  translateBtn.on('click', getTranslation);
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
      console.log(`joke: ${data.joke}\ttype: ${typeof data.joke}`);
      let jokeText = $('#joke');
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
  const phrase = $('#joke').text();

  // Capture joke text
  const sentence = encodeURIComponent(phrase);

  if (sentence) {
    fetchTranslation(sentence);
  } else {
    alert('please enter a sentence for master yoda');
    return;
  }
}

// getTranslation Helper
function fetchTranslation(s) {
  const requestURL = `https://api.funtranslations.com/translate/yoda.json?text=${s}`;//&apikey=${translateAPIkey}`;
  const translatedText = $('#translated');
  fetch(requestURL)
    .then(function(response) {
      if(response.status != 200){
        console.log("TranslateAPI response not 200", response);
      }
      return response.json();
    })
    .then(function(data) {
      if(!data[0]){
        const str = "This is a hard-coded string to allow the app to complete";
        console.log("Temporary catch due to too many translate API hits");
        console.log(str);
        translatedText.text(str);
      } else {
        translatedText.text(data.contents.translated);
      }
    })
}
