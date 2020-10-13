import { Controller } from "stimulus"
import Rails from "@rails/ujs"

export default class extends Controller {
  static targets = ["source", "check", "form"]

  connect() {
    console.log("--> collab controller connected");

  }

  submit() {
    event.preventDefault();
    const type = event.currentTarget.dataset.type;
    let form = event.currentTarget.parentElement;

    if (event.currentTarget.dataset.input === "checkbox") {
      form = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
    };

    if (event.currentTarget.dataset.input === "dropdown") {
      form = event.currentTarget.parentElement.parentElement;
    };

    form.method = "post";
    Rails.fire(form, "submit");
  }
}
