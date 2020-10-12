import { Controller } from "stimulus";
import { showHideFunctionNext } from "helpers/collaboration"

export default class extends Controller {
  static targets = ["function", "failure_mode"]

  initialize() {
  };

  connect() {
    console.log("--> collaboration controller connected");
    console.log(this.functionTargets);
    console.log(this.failure_modeTargets);
    console.log(this.failureModeId);
    console.log(this.functionId);
  };

  nextFunction() {
    console.log("next function clicked");
    
    showHideFunctionNext(this.functionId, this.functionTargets);
  };

  previousFunction() {
    console.log("previous function clicked")
  };

  nextFailureMode() {
    console.log("next failure mode clicked")
  };
  previousFailureMode() {
    console.log("previous failure mode clicked")
  };

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
