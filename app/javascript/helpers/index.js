const sameType = (elements, element) => {
  let sameTypeAll = []
  elements.forEach((compareElement) => {
    if (element.dataset.cardType === compareElement.dataset.cardType) {
      sameTypeAll.push(compareElement);
    };
  });
  return sameTypeAll;
}

const toggleClass = (elements, element, cardType) => {
  element.classList.toggle(`selected-${cardType}`);
  elements.forEach((e) => {
    if(e.dataset.id !== element.dataset.id) {
      e.classList.remove(`selected-${cardType}`);
    };
  });
}

export { toggleClass, sameType }
