# [It is trivial](https://krtcotmo2.github.io/TriviaGame/)

A game of trivia using multiple choice questions. The primary focus of this exercise is not the click events or timer of the game but more of the backend. There was a deliberate separation of files and functions within the file. Instead of creating a bunch of functions in a flat js file, the game is an object and the functions are within the object. 

The questions are an independent array of objects that also hold numerous properties including arrays and other objects.


[<img src='https://github.com/krtcotmo2/TriviaGame/blob/master/assets/images/spidermanTrivia.png'/>](https://krtcotmo2.github.io/TriviaGame/)

The game could have been set to start with a series of questions instead of just 6. The object for the questions allowed for an array of answers which allowed me to potentially have two or more answers.

The game was built out as one object. The timer could have been created as a separate object and jQuery is used to contract the timer bar above the question as a form of a count down.

