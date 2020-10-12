import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["source", "form"]

  connect() {

  }

  submit() {
    const forms = this.formTargets;
    const type = event.currentTarget.dataset.type;
    console.log(forms);
    console.log(type);
    let form = null;
    if (type === "effect") {
      forms.forEach((f) => {
        if (f.dataset.effectId === event.currentTarget.dataset.id) {
          form = f;
        };
      });
    };

    if (type === "cause") {
      forms.forEach((f) => {
        if (f.dataset.causeId === event.currentTarget.dataset.id) {
          form = f;
        };
      });
    };
    form.method = "post";
    console.log(form.method);
    form.submit();
  }
}
