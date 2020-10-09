const toggleClass = (elements, element, cardType) => {
  element.classList.toggle(`selected-${cardType}`);
  console.log(element.dataset.cardIndex);
  elements.forEach((e) => {
    if(e.dataset.cardIndex !== element.dataset.cardIndex) {
      console.log("i work");
      e.classList.remove(`selected-${e.dataset.cardType}`);
    };
  });
}

export { toggleClass }
