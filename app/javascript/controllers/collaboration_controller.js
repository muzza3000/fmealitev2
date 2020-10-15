import { Controller } from "stimulus";
import {
  showFailureMode,
  showFunction,
  showCauseEffect,
  calcNextIdsFromFunction,
  calcPreviousIdsFromFunction,
  calcNextIdsFromFailureMode,
  calcPreviousIdsFromFailureMode,
  createMapFM,
  createMapFunc,
  functionIds,
  failureModeIds,
  currentOccurrence,
  effectSeverity,
  currentScale,
  colorRPN
} from "helpers/collaboration";
import Rails from "@rails/ujs";
import  { fetchWithToken } from "helpers/fetch_with_token" ;


export default class extends Controller {

  static targets = ["function", "failure_mode", "cause", "effect", "source", "check", "form", "causeForm", "effectForm", "causeFormFailureModeInput", "effectFormFailureModeInput", "rpn"]


  initialize() {
  };

  connect() {
    console.log("--> collaboration controller connected");
    setInterval(() => this.refreshRPN(), 1000);
  };

  refreshRPN() {
    // get rating scale
    const scale = currentScale(this.causeTarget);
    // get all the occurrence scores for the current failure mode
    const occ = currentOccurrence(this.failureModeId, this.causeTargets);
    // get all the severity scores for the current failure mode
    const sev = effectSeverity(this.failureModeId, this.effectTargets);
    // multiply the max of both
    const rpn = Math.max(...occ) * Math.max(...sev)
    // populate the RPN score field
    this.rpnTarget.innerText = rpn
    // apply styles accordingly
    colorRPN(scale, rpn, this.rpnTarget);
  }

  nextFunction() {
    this.rpnTarget.innerText = ""
    // build the map of objects from the DOM elements
    const map = createMapFunc(functionIds(this.functionTargets), failureModeIds(this.failure_modeTargets))

    // calc id's of next objects
    const ids = calcNextIdsFromFunction(this.functionId, this.failureModeId, map);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets)
    showCauseEffect(ids.failureModeId, this.causeTargets);
    showCauseEffect(ids.failureModeId, this.effectTargets);

    // // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };

  previousFunction() {
    this.rpnTarget.innerText = ""
    // build the map of objects from the DOM elements
    const map = createMapFunc(functionIds(this.functionTargets), failureModeIds(this.failure_modeTargets))

    // calc id's of next objects
    const ids = calcPreviousIdsFromFunction(this.functionId, this.failureModeId, map);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets);
    showCauseEffect(ids.failureModeId, this.causeTargets);
    showCauseEffect(ids.failureModeId, this.effectTargets);

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };

  nextFailureMode() {
    this.rpnTarget.innerText = ""
    // build the map of the objects for convenient lookup
    const map = createMapFM(functionIds(this.functionTargets), failureModeIds(this.failure_modeTargets))

    // calc the id of the next function
    const ids =  calcNextIdsFromFailureMode(this.functionId, this.failureModeId, map);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets);
    showCauseEffect(ids.failureModeId, this.causeTargets);
    showCauseEffect(ids.failureModeId, this.effectTargets);

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };

  previousFailureMode() {
    this.rpnTarget.innerText = ""
    // build the map of the objects for convenient lookup
    const map = createMapFM(functionIds(this.functionTargets), failureModeIds(this.failure_modeTargets))

    // calc the id of the next function
    const ids =  calcPreviousIdsFromFailureMode(this.functionId, this.failureModeId, map);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets);
    showCauseEffect(ids.failureModeId, this.causeTargets);
    showCauseEffect(ids.failureModeId, this.effectTargets);

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };


  // The submit function submits the live-forms for the causes and effects.
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

    // form.method = "post";

    const formData = new URLSearchParams(new FormData(form));

    fetchWithToken( form.action, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    })
  }

  effectCreate() {
    this.effectFormFailureModeInputTarget.value = this.failureModeId
    this.effectFormTarget.submit()
  }

  causeCreate() {
    this.causeFormFailureModeInputTarget.value = this.failureModeId
    this.causeFormTarget.submit()
  }

  // Getters and setters
  get failureModeId() {
    return parseInt(this.data.get("failuremode"))
  };
  set failureModeId(value) {
    this.data.set("failuremode", value);
  };
  get functionId() {
    return parseInt(this.data.get("function"))
  };
  set functionId(value) {
    this.data.set("function", value);
  };
};
