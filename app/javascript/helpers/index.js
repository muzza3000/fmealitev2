const isChild = (element, compared_e ) => {
  const classChild = compared_e.dataset.cardType;
  const classParent = element.dataset.cardType;
  if ((classChild === "failuremode")&&(classParent==="function")) {
    return ( element.dataset.id === compared_e.dataset.parentId );
  } else if ((classChild === "cause")&&(classParent==="failuremode")) {
    return ( element.dataset.id === compared_e.dataset.parentId );
  } else if ((classChild === "effect")&&(classParent==="failuremode")) {
    return ( element.dataset.id === compared_e.dataset.parentId );
  } else {
    return false;
  };
};

const isTheSame = (element, compared_e) => {
    const classE = element.dataset.cardType;
    const classC = compared_e.dataset.cardType;

    if ((classE === "function")&&(classC === "function")) {
    return ( element.dataset.id === compared_e.dataset.id );
  } else if ((classE === "failuremode")&&(classC === "failuremode")) {
    return ( element.dataset.id === compared_e.dataset.id );
  } else if ((classE === "cause")&&(classC === "cause")) {
    return ( element.dataset.id === compared_e.dataset.id );
  } else if ((classE === "effect")&&(classC === "effect")) {
    return ( element.dataset.id === compared_e.dataset.id );
  } else {
    return false;
  };
};

const parentFind = (element, elements) => {
  const classChild = element.dataset.cardType;
  let classParent = null;
  let parent = null;


  if ((classChild === "effect")||(classChild === "cause")) {
    classParent = "failuremode";
  } else if (classChild === "failuremode") {
    classParent = "function";
  };

  elements.forEach((e) => {
    if ((element.dataset.parentId === e.dataset.id) && (e.dataset.cardType === classParent)) {
      parent = e;
    };
  });

  return parent
};

const toggleClass = (elements, element) => {
  parentFind(element, elements);
  // Here, we put the border-property on the selected element
  element.classList.toggle(`selected-${element.dataset.cardType}`);
  elements.forEach((e) => {
    if(e.dataset.cardIndex !== element.dataset.cardIndex) {
      e.classList.remove(`selected-${e.dataset.cardType}`);
    };
  });
  // Here, we put the opacity–property upon all elements which are not children of the selected element.
  // We start off by definig some counts.
  // Now, we add the 'disselected'-property to all elements which are not children/or the selected one.
  // The if statements serve to correctly toggle for every edge-case, e.g. that you should be able to disselect(unblur) all elements again by clicking on the selected one etc.
  if(!(element.classList.contains(`selected-${element.dataset.cardType}`))) {
      elements.forEach((e) => {
        e.classList.remove("disselected");
      });
  } else {
      elements.forEach((e) => {
        e.classList.remove("disselected");
        if ((!(isChild(element, e)))&&(!(isTheSame(element, e)))) {
          e.classList.add("disselected");
        };
      });

      elements.forEach((e) => {
        const parent = parentFind(e, elements);
        if (!(parent === null)) {
          const grandparent = parentFind(parent, elements);
          if (!(grandparent === null)) {
            if (grandparent.classList.contains(`selected-${element.dataset.cardType}`)) {
              e.classList.remove("disselected");
            };
          };
        };
      });
  };
};



export { toggleClass }
