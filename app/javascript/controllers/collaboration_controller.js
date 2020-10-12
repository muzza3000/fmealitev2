import { Controller } from "stimulus";
import {
  showFailureMode,
  showFunction,
  createTree,
  calcNextIdsFromFunction,
  calcPreviousIdsFromFunction
} from "helpers/collaboration"


const x = () => {
  return "test"
};


export default class extends Controller {
  static targets = ["function", "failure_mode"]

  initialize() {
  };



  connect() {
    console.log("--> collaboration controller connected");
  };

  nextFunction() {
    // build the tree of objects
    const tree = createTree(this.functionTargets, this.failure_modeTargets);

    // calc id's of next objects
    const ids = calcNextIdsFromFunction(this.functionId, this.failureModeId, tree);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets)

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };

  previousFunction() {
    console.log("previous function clicked")
    // build the tree of objects
    const tree = createTree(this.functionTargets, this.failure_modeTargets);

    // calc id's of next objects
    const ids = calcPreviousIdsFromFunction(this.functionId, this.failureModeId, tree);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets)

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
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
