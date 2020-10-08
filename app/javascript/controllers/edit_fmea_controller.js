import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["function", "one-function", "failure-mode", "cause", "effect"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
    console.log("I work");

   }


  select() {
    const FmeaFunctions = this.functionTargets
    FmeaFunctions.forEach ((f) => {
      f.classList.remove("selected-function");
    });
    let fmeaFunction = event.currentTarget
    fmeaFunction.classList.toggle("selected-function")
  }
}
