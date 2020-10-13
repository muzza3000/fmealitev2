import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["source", "form"]

  connect() {
    console.log("--> collab controller connected");

  }

  submit() {
    console.log("#submit was executed");
    const type = event.currentTarget.dataset.type;
    console.log(type);
    let form = event.currentTarget.parentElement;
    // if (type === "effect") {
      // forms.forEach((f) => {
      //   if (f.dataset.effectId === event.currentTarget.dataset.id) {
      //     form = f;
      //   };
      // });
    // };

    // if (type === "cause") {
    // };
    console.log(form);
    form.method = "post";
    console.log(form.method);
    form.submit();
  }
}
