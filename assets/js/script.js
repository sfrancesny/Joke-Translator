function getJoke(url) {
  return fetch(url)
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
      return data.joke;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}


 // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let url = 'https://geek-jokes.sameerkumar.website/api?format=json';
  
  // TODO:  Do all the cool things!
  console.log("... in the beginning!");

  getJoke(url)
    .then((joke) => {
      console.log(`joke: ${joke}\ttype: ${typeof joke}`);
      // Perform further actions with the joke
    });
});

    joke = getJoke(url);
    console.log("joke: ", joke, "\ttype: ", typeof(joke));
  });

  const inputTranslation = document.getElementById('input-translation')
  const form = document.getElementById('form')

  let sentence = ''
  let apiKey = '9fH_W0mxmUPzSh6bXbWBSweF';

  function fetchTranslation(s) {
    const requestURL = `https://api.funtranslations.com/translate/yoda.json?text=${s}&apikey=${apiKey}`;

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

