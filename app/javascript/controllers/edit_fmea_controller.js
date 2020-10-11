import { Controller } from "stimulus"
import { toggleClass } from "helpers/index"

export default class extends Controller {
  static targets = ["card"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
   }

  select() {
    const element = event.currentTarget;
    const allElements = this.cardTargets;
    //console.log(`id: ${element.dataset.id}`)
    //console.log(`parent id: ${element.dataset.parentId}`)
    toggleClass(allElements, element)
  };
};
