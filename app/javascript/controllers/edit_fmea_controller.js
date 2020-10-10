import { Controller } from "stimulus"
import { toggleClass } from "helpers/index"

export default class extends Controller {
  static targets = ["card", "failuremode"]

  initialize() {
    const selectedItemType = this.data.get("selected-item-type")
    const selectedItemId = parseInt(this.data.get("selected-item-id"))
  }

  connect() {
    // if statement to only display copy button if browser
    // support the action
   }

   createFailureMode () {
    // need to set the right id as the value in the modal form
    this.failuremodeTarget.value = this.selectedItemId;
    console.log(this.failuremodeTarget);
  }

  select() {
    // write the current selection type to the DOM this means any method
    //  can read the current 'this.selectedItemType' and 'this.selectedItemId'
    this.selectedItemType = event.currentTarget.dataset.cardType;
    this.selectedItemId = event.currentTarget.dataset.id;

    const element = event.currentTarget;
    const allElements = this.cardTargets;
    const cardType = element.dataset.cardType;
    const childrenCount = element.dataset.childrenCount
    toggleClass(allElements, element, cardType, childrenCount)
  };

  // Getters and setters
  get selectedItemId() {
    return parseInt(this.data.get("selected-item-id"))
  }
  set selectedItemId(value) {
    this.data.set("selected-item-id", value);
  }
  get selectedItemType() {
    return this.data.get("selected-item-type");
  }
  set selectedItemType(value) {
    this.data.set("selected-item-type", value);
  }
};
