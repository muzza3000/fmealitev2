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

export const calcNextIdsFromFunction = (functionId, failureModeId, tree) => {
  // receive the current functionId and the tree
  // calc which function is next

  let nextFunctionId = functionId;
  let nextFailureModeId = failureModeId;

  tree.children.forEach((func, i, arr) => {

    if ((func.id === functionId) && (i + 1 < arr.length)) {

      nextFunctionId = arr[i + 1].id;

      if (arr[i + 1].hasOwnProperty("children")) {
        nextFailureModeId = arr[i + 1].children[0].id;
      } else {
        nextFailureModeId = null
      }

    }

  });

  // return object of ids
  return {
    functionId: nextFunctionId,
    failureModeId: nextFailureModeId
  }
};

export const calcPreviousIdsFromFunction = (functionId, failureModeId, tree) => {
  // receive the current functionId and the tree
  // calc which function is next

  let nextFunctionId = functionId;
  let nextFailureModeId = failureModeId;

  tree.children.forEach((func, i, arr) => {

    if ((func.id === functionId) && (i - 1 >= 0)) {

      nextFunctionId = arr[i - 1].id;

      if (arr[i - 1].hasOwnProperty("children")) {
        nextFailureModeId = arr[i - 1].children[0].id;
      } else {
        nextFailureModeId = null
      }

    }

  });

  // return object of ids
  return {
    functionId: nextFunctionId,
    failureModeId: nextFailureModeId
  }
};



export const createTree = (functionTargets, failure_modeTargets) => {
  // algorithm obtained here: https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/

  const data = [];
  // create the {id: X, parentId: Y} object array
  data.push({ id: 0, parentId: null });
  functionTargets.forEach((func) => {
    let key = func.dataset.id;
    data.push({
      id: parseInt(func.dataset.id),
      parentId: 0
    });
  })
  failure_modeTargets.forEach((fm) => {
    let key = fm.dataset.id;
    data.push({
      id: parseInt(fm.dataset.id),
      parentId: parseInt(fm.dataset.parentId)
    });
  })

  // create a mapping
  const idMapping = data.reduce((acc, el, i) => {
    acc[el.id] = i;
    return acc;
  }, {});

  // create a tree
  let root;
  data.forEach(el => {
    if (el.parentId === null) {
      root = el;
      return;
    }
    const parentEl = data[idMapping[el.parentId]];
    parentEl.children = [...(parentEl.children || []), el];
  });

  return root
};
