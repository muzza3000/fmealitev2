import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["function", "failuremode"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
   }


  select() {
    const failureModeButton = document.querySelector("#add-failure-mode");
    const causeButton = document.querySelector("#add-cause");
    let element = event.currentTarget;

    if (element.classList.contains("is-function")) {
      console.log(event.currentTarget);
      if (!(element.classList.contains("selected-function"))) {
        element.classList.add("selected-function");
        failureModeButton.classList.remove("hidden-button")
      } else {
        element.classList.remove("selected-function");
        failureModeButton.classList.add("hidden-button")
      };
      // Here, some code should follow which removes the selection of all other function-elements.
    };

    if (element.classList.contains("is-failuremode")) {
      console.log(event.currentTarget);
      if (!(element.classList.contains("selected-failure-mode"))) {
        element.classList.add("selected-failure-mode");
        causeButton.classList.remove("hidden-button")
      } else {
        element.classList.remove("selected-failure-mode");
        causeButton.classList.add("hidden-button")
      };
      // Here, some code should follow which removes the selection of all other failure-mode-elements.
    };

  };
};
