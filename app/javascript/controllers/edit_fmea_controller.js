import { Controller } from "stimulus"
import { toggleClass } from "helpers/index"

export default class extends Controller {
  static targets = ["card"]

  connect() {
   }

  select() {
    const element = event.currentTarget;
    const allElements = this.cardTargets;
    toggleClass(element, allElements)
  };
};
