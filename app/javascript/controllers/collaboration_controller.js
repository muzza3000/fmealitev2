import { Controller } from "stimulus";
import {
  showFailureMode,
  showFunction,
  createTree,
  calcNextIdsFromFunction,
  calcPreviousIdsFromFunction,
  calcNextIdsFromFailureMode,
  calcPreviousIdsFromFailureMode,
  createMap
} from "helpers/collaboration"


export default class extends Controller {
  static targets = ["function", "failure_mode"]

  initialize() {
  };

  connect() {
    console.log("--> collaboration controller connected")
  };

  nextFunction() {
    // build the tree of objects from the DOM elements
    const tree = createTree(this.functionTargets, this.failure_modeTargets);

    // calc id's of next objects
    const ids = calcNextIdsFromFunction(this.functionId, this.failureModeId, tree);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets)

    // // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };

  previousFunction() {
    // build the tree of objects from the DOM elements
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
    // build the tree of objects from the DOM elements
    const tree = createTree(this.functionTargets, this.failure_modeTargets);
    // build the map of the objects for convenient lookup
    const map = createMap(tree);

    // calc the id of the next function
    const ids =  calcNextIdsFromFailureMode(this.functionId, this.failureModeId, map);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets)

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
  };

  previousFailureMode() {
    // build the tree of objects from the DOM elements
    const tree = createTree(this.functionTargets, this.failure_modeTargets);
    // build the map of the objects for convenient lookup
    const map = createMap(tree);

    // calc the id of the next function
    const ids =  calcPreviousIdsFromFailureMode(this.functionId, this.failureModeId, map);

    // show next objects
    showFunction(ids.functionId, this.functionTargets);
    showFailureMode(ids.failureModeId, this.failure_modeTargets)

    // set the current ids in the Dom
    this.functionId = ids.functionId
    this.failureModeId = ids.failureModeId
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
