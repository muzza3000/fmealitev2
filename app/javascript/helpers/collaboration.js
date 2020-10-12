const showHideFunctionNext = (currentFunctionId, functions) => {
  let i = 0;
  functions.forEach((f) => {
    if (currentFunctionId === parseInt(f.dataset.id)) {
      f.parentElement.classList.add("hidden");
      functions[ i + 1 ].parentElement.classList.remove("hidden");
      // set new function id
      currentFunctionId = functions[ i + 1 ].dataset.id;
    };
    i++
  });
};

export { showHideFunctionNext }