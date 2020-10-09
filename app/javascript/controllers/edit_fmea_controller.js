import { Controller } from "stimulus"
import { sameType, toggleClass } from "helpers/index"

export default class extends Controller {
  static targets = ["card"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
   }



  select() {
    const element = event.currentTarget;
    console.log(element.dataset.cardIndex)
    const allElements = this.cardTargets;
    const cardType = element.dataset.cardType;
    const typeElements = sameType(allElements, element);
    toggleClass(typeElements, element, cardType)
  };
};
