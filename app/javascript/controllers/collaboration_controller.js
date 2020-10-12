import { Controller } from "stimulus";

export default class extends Controller {
  static targets = [""]

  initialize() {
  };

  connect() {
    console.log("--> collaboration controller connected");
   }
};