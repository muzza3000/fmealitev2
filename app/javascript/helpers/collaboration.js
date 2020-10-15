export const showFunction = (id, functions) => {
  functions.forEach((f) => {
    if (id === parseInt(f.dataset.id)) {
      f.parentElement.classList.remove("hidden");
    } else {
      f.parentElement.classList.add("hidden");
    }
  });
};

export const showFailureMode = (id, failureModes) => {
  failureModes.forEach((f) => {
    if (id === parseInt(f.dataset.id)) {
      f.parentElement.classList.remove("hidden");
    } else {
      f.parentElement.classList.add("hidden");
    }
  });
};

export const showCauseEffect = (parentId, causes) => {
  causes.forEach((c) => {
    if (parentId === parseInt(c.dataset.parentId)) {
      c.parentElement.classList.remove("hidden");
    } else {
      c.parentElement.classList.add("hidden");
    }
  });
};


export const functionIds = (functionTargets) => {
  return functionTargets.map((func) => (
    {id: parseInt(func.dataset.id)}
  ));
};

export const failureModeIds = (failure_modeTargets) => {
  return failure_modeTargets.map((fm) => (
    {
      id: parseInt(fm.dataset.id),
      functionid: parseInt(fm.dataset.parentId)
    }
  ));
};

export const createMapFM = (functions, failureModes) => {
  let map = [[],[]]
  functions.forEach((func) => {
    failureModes.filter((el) => el.functionid === func.id).forEach((fm) => {
      map[0].push(func.id);
      map[1].push(fm.id);
    });
  });
  return map
}

export const createMapFunc = (functions, failureModes) => {
  let map = [[],[]]
  functions.forEach((func) => {
      if (failureModes.find((el) => el.functionid === func.id)) {
          map[0].push(func.id);
          map[1].push(failureModes.find((el) => el.functionid === func.id).id);
      } else {
        map[0].push(func.id);
        map[1].push(null);
      }
    });
  return map
  };

export const calcNextIdsFromFailureMode = (functionId, failureModeId, map) => {
  let nextFunctionId = functionId;
  let nextFailureModeId = failureModeId;

  // locate the matching failure mode in the map
  let failureModeIndex = map[1].findIndex( (id) => id === failureModeId )

  if (failureModeIndex + 1 < map[1].length) {
    nextFunctionId = map[0][failureModeIndex + 1]
    nextFailureModeId = map[1][failureModeIndex + 1]
  }

  // return object of ids
  return {
    functionId: nextFunctionId,
    failureModeId: nextFailureModeId
  }
};

export const calcPreviousIdsFromFailureMode = (functionId, failureModeId, map) => {
  let nextFunctionId = functionId;
  let nextFailureModeId = failureModeId;

  // locate the matching failure mode in the map
  let failureModeIndex = map[1].findIndex( (id) => id === failureModeId )

  if (failureModeIndex - 1 >= 0) {
    nextFunctionId = map[0][failureModeIndex - 1]
    nextFailureModeId = map[1][failureModeIndex - 1]
  }

  // return object of ids
  return {
    functionId: nextFunctionId,
    failureModeId: nextFailureModeId
  }
};

export const calcNextIdsFromFunction = (functionId, failureModeId, map) => {
  let nextFunctionId = functionId;
  let nextFailureModeId = failureModeId;

  // locate the matching function in the map
  let functionIndex = map[0].findIndex( (id) => id === functionId )

  if (functionIndex + 1 < map[0].length) {
    nextFunctionId = map[0][functionIndex + 1]
    nextFailureModeId = map[1][functionIndex + 1]
  }

  // return object of ids
  return {
    functionId: nextFunctionId,
    failureModeId: nextFailureModeId
  }
};

export const calcPreviousIdsFromFunction = (functionId, failureModeId, map) => {
  let nextFunctionId = functionId;
  let nextFailureModeId = failureModeId;

  // locate the matching failure mode in the map
  let functionIndex = map[0].findIndex( (id) => id === functionId )

  if (functionIndex - 1 >= 0) {
    nextFunctionId = map[0][functionIndex - 1]
    nextFailureModeId = map[1][functionIndex - 1]
  }

  // return object of ids
  return {
    functionId: nextFunctionId,
    failureModeId: nextFailureModeId
  }
};

export const currentOccurrence = (failureModeId, causes) => {
  const output = [0];
  causes.forEach((cause) => {
    if (parseInt(cause.dataset.parentId) === failureModeId) {
      output.push(parseInt(cause.querySelector('#cause_occurrence').value))
    }
  })
  return output
};

export const effectSeverity = (failureModeId, failure_modes) => {
  const output = [0];
  failure_modes.forEach((failure_mode) => {
    if (parseInt(failure_mode.dataset.parentId) === failureModeId) {
      output.push(parseInt(failure_mode.querySelector('#effect_severity').value))
    }
  })
  return output
};

export const currentScale = (target) => {
  let scale = parseInt(target.querySelector('#cause_occurrence').length);
  scale = scale**2;
  return scale;
};

export const colorRPN = (scale, rpn, rpnTarget) => {
  let color = "";
  // RPN colour logic
  if (rpn <= 0.4 * scale) {
    color = "green"
  } else if ( rpn <= 0.8 * scale) {
    color = "yellow"
  } else {
    color = "red"
  }
  // remove all old colors
  rpnTarget.classList.remove(`rpn-yellow`)
  rpnTarget.classList.remove(`rpn-red`)
  rpnTarget.classList.remove(`rpn-green`)
  // apply new color
  rpnTarget.classList.add(`rpn-${color}`)
};