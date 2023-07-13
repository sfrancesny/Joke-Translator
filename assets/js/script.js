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
