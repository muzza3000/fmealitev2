import { Controller } from "stimulus";

export default class extends Controller {
  static targets = ["header", "productImage", "headerRight"]

  initialize() {
  };

  connect() {
    console.log("--> product header controller connected");
   };

  scroll () {
    if (window.pageYOffset >= this.headerTarget.offsetHeight - 50) {
      this.headerTarget.classList.add("collapsed");
      this.productImageTarget.classList.add("collapsed");
      this.headerRightTarget.classList.add("collapsed");
    } else {
      this.headerTarget.classList.remove("collapsed");
      this.productImageTarget.classList.remove("collapsed");
      this.headerRightTarget.classList.remove("collapsed");
    };
  };
};