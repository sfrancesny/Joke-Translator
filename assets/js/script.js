function getJoke(url){
  fetch(url)
    .then(function (response){
      if(response.status != 200){
        console.log("Status not 200!!!\t", response);
      }
      return response.json();
    })
    .then(function (data){
      console.log("joke: ", data.joke, "\ttype: ", typeof(data.joke));
      let jokeText = $('#joke');
      jokeText.text(data.joke);
      return data;
    });
}


  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let url = 'https://geek-jokes.sameerkumar.website/api?format=json';
  let jokeText = $('#joke');
  let joke;
    // TODO:  Do all the cool things!
    console.log("... in the beginning!");

    joke = getJoke(url);
    console.log("joke: ", joke, "\ttype: ", typeof(joke));
  });

  const inputTranslation = document.getElementById('input-translation')
  const form = document.getElementById('form')

  let sentence = ''
  let apiKey = '9fH_W0mxmUPzSh6bXbWBSweF';

  function fetchTranslation(s) {
    const requestURL = `https://api.funtranslations.com/translate/yoda.json?text=${s}&apikey=" + "apiKey"`

    fetch(requestURL)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data)
      })
    }

  function getTranslation(event) {
    event.preventDefault()
    
    let phrase = inputTranslation.value
    
    sentence = encodeURIComponent(phrase)

    inputTranslation.value = ''

    console.log(sentence)

    if (sentence) {
        fetchTranslation(sentence)
    } else {
      alert('please enter a sentence for master yoda')
      return
    }
  }

  form.addEventListener('submit', getTranslation)

