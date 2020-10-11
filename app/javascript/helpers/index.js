const toggleClass = (elements, element, cardType, childrenCount) => {
  // Here, we put the border-property on the selected element
  element.classList.toggle(`selected-${cardType}`);
  // console.log(element.dataset.cardIndex);
  elements.forEach((e) => {
    if(e.dataset.cardIndex !== element.dataset.cardIndex) {
      e.classList.remove(`selected-${e.dataset.cardType}`);
    };
  });

  // Here, we put the opacity–property upon all elements which are not children of the selected element.
  // We start off by definig some counts.
  let childrenIndeces = [parseInt(element.dataset.cardIndex, 10)];
  let count = 1;
  const childrenCountInt = parseInt(childrenCount, 10);
  let childrenCardIndex = 0
  // Now, we add all indeces of the children of the element to an array.
  while (childrenIndeces.length <= childrenCountInt) {
    childrenCardIndex = parseInt(element.dataset.cardIndex, 10) + count;
    childrenIndeces.push(childrenCardIndex);
    count += 1;
  };
  // Now, we add the 'disselected'-property to all elements which are not children/or the selected one.
  // The if statements serve to correctly toggle for every edge-case, e.g. that you should be able to disselect(unblur) all elements again by clicking on the selected one etc.
  if(!(element.classList.contains(`selected-${cardType}`))) {
      elements.forEach((e) => {
        e.classList.remove("disselected");
      });
  } else {
      elements.forEach((e) => {
        e.classList.remove("disselected");
        // console.log(e)
        if(!(childrenIndeces.includes(parseInt(e.dataset.cardIndex, 10)))) {
          e.classList.add("disselected");
        };
      });
  };
};

const itemPath = (itemType) => {
  if (itemType === "failuremode") {
    return "failure_mode";
  } else {
    return itemType;
  };
};

export { toggleClass, itemPath }
