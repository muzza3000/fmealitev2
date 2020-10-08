import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["function", "one-function", "failure-mode", "cause", "effect"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
    console.log("I work");

   }


  select() {
    console.log("the funtion is called")
    let fmeaFunction = event.currentTarget
    if (!(fmeaFunction.classList.contains("selected-function"))) {
      fmeaFunction.classList.add("selected-function");
    } else {
      fmeaFunction.classList.remove("selected-function");
    };
    const FmeaFunctions = this.functionTargets
    FmeaFunctions.forEach ((f) => {
      if (f !== fmeaFunction) {
      f.classList.remove("selected-function");
      };
    });
  };
};
