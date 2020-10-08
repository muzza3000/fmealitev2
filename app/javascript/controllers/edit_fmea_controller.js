import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["function", "failure-mode", "cause", "effect"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
    console.log("I work");

   }


  select() {
    const fmeaFunction = this.functionTarget
    console.log("I work too:)")
    fmeaFunction.classList.add("selected-function")
  }

  copy() {
    // In order to copy you must select the text, therefore you must
    // use and input element. Therefore this is temporarily created
    // and then removed to perform the copy action.
    const textToCopy = this.sourceTarget.innerText;

    let myTempInputElement = document.createElement("input");
    myTempInputElement.type = "text";
    myTempInputElement.value = textToCopy;

    document.body.appendChild(myTempInputElement);

    myTempInputElement.select();
    document.execCommand("copy");

    document.body.removeChild(myTempInputElement);
  }
}
