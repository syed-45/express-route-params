import express from "express";
import { isVowel } from "./isVowel";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});



app.get<{ food: string }>("/eat/:food", (req, res) => {
    
  let afood: string
  if ( isVowel(req.params.food.substring(0, 1)) ) {
    afood = "an " + req.params.food
  } else {
    afood = "a " + req.params.food
  }

  res.json({
    message: `Yum yum - you ate ${afood}!`
  });
});

app.get<{ exampleRouteParameter: string }>("/echo/:exampleRouteParameter", (req, res) => {   //<T> specify type for route params
  const echoContent = req.params.exampleRouteParameter;
  res.json({
    echo: echoContent,
    message: `I am echoing back to you: ${echoContent}`,
  });
});

app.get<{ numOne: string, numTwo: string }>("/multiply/:numOne/:numTwo", (req, res) => {
  /**
   * Note that `numOne` and `numTwo` are both typed as string.
   * (Hover over with your mouse to see!)
   *
   * Route params are, by default, typed as strings when they
   * are parsed by Express.
   */
  const { numOne, numTwo } = req.params;
  const multiplication = parseInt(numOne) * parseInt(numTwo);
  res.json({
    original: `${numOne} x ${numTwo}`,
    result: multiplication,
  });
});

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ shoutParam: string }>("/shout/:shoutParam", (req, res) => {   //<T> specify type for route params
  const shoutContent = req.params.shoutParam;
  res.json({
    shout: shoutContent,
    result: `I am shouting back to you: ${shoutContent.toUpperCase()}!`,
  });
});

app.get<{ numOne: string, numTwo: string }>("/add/:numOne/:numTwo", (req, res) => {
  const { numOne, numTwo } = req.params;
  const addition = parseInt(numOne) + parseInt(numTwo);
  res.json({
    original: `${numOne} + ${numTwo}`,
    result: addition,
  });
});

app.get<{ numOne: string, numTwo: string, numThree: string }>("/add/:numOne/:numTwo/:numThree", (req, res) => {
  const { numOne, numTwo, numThree} = req.params;
  const addition = parseInt(numOne) + parseInt(numTwo) + parseInt(numThree);
  res.json({
    original: `${numOne} + ${numTwo} + ${numThree}`,
    result: addition,
  });
});


// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
