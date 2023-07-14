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

