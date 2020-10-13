import { Controller } from "stimulus"
import Rails from "@rails/ujs"

export default class extends Controller {
  static targets = ["source", "check", "form"]

  prepareParams(event) {
    event.preventDefault();
  }

  connect() {
    console.log("--> collab controller connected");

  }

  submit() {
    event.preventDefault();
    console.log("#submit was executed");
    const type = event.currentTarget.dataset.type;
    console.log(type);
    let form = event.currentTarget.parentElement;

    if (event.currentTarget.dataset.input === "checkbox") {
      form = event.currentTarget.parentElement.parentElement.parentElement.parentElement;
    };

    if (event.currentTarget.dataset.input === "dropdown") {
      form = event.currentTarget.parentElement.parentElement;
    };

    console.log(form);
    form.method = "post";
    console.log(form.method);
    Rails.fire(form, "submit");
  }
}
