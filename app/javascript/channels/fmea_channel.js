import consumer from "./consumer";

export const initFmeaCable = () => {

  // search for elements on the page
  const causeEffectContainer = document.getElementById('cause-effect-collaboration');
  const causeGrid = document.getElementById('cause-grid');
  const effectGrid = document.getElementById('effect-grid');

  // Only run code if on the collaboration page and containers
  // are all present
  if ((causeEffectContainer) && (causeGrid) && (effectGrid)) {
    const id = causeEffectContainer.dataset.fmeaId;

    console.log(`--> Channel connected to FMEA ${id}`);

    consumer.subscriptions.create({ channel: "FmeaCollaborationChannel", id: id }, {
      received(data) {

        // expected data should be json
        // {
        //   type: cause / effect
        //   action: create / destroy / update
        //   payload: card_html or Id
        // }

        // parse the payload as json
        const payload = JSON.parse(data);

        // Create
        if (payload.action === "create") {
          const newCard = `<div class="${payload.type}-card">${payload.body}</div>`;
          if (payload.type === "cause") {
            causeGrid.insertAdjacentHTML('beforeend', newCard)
          } else if (payload.type === "effect") {
            effectGrid.insertAdjacentHTML('beforeend', newCard)
          };
        };

        // Destroy
        if (payload.action === "destroy") {
          // get card from document
          const card = document.getElementById(`${payload.type}-${payload.id}`);
          // if card exists remove from DOM
          if (card) {
            card.parentNode.removeChild(card);
          };
        };

        // Update
        if (payload.action === "update") {
          // get card from document
          let card = document.getElementById(`${payload.type}-${payload.id}`);
          // if card exists in the dom update HTML
          if (card) {
            const newCard = `<div class="${payload.type}-card">${payload.body}</div>`;
            card.parentElement.innerHTML = newCard;
          };
        };
      },
    });
  }
}