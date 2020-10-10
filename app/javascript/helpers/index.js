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

const toggleClass = (elements, element) => {
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
      let whitelist = []
      elements.forEach((e) => {
        e.classList.remove("disselected");
        if (isChild(element, e)) {
          whitelist.push(e.dataset.id);
        };
        if (!(isChild(element, e)) && (e.dataset.id !== element.dataset.id)) {
          e.classList.add("disselected");
        };
      });

      elements.forEach((e) => {
        console.log(whitelist.includes(e.dataset.parentId))
        if (whitelist.includes(e.dataset.parentId)) {
          e.classList.remove("disselected");
        };
      });
      console.log(whitelist);
  };
};



export { toggleClass }
