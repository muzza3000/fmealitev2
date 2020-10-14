import consumer from "./consumer";

export const initFmeaCable = () => {

  // search for elements on the page
  const causeEffectContainer = document.getElementById('cause-effect-collaboration');
  const causeGrid = document.getElementById('cause-grid');
  const insertPointCauseGrid = document.getElementById('insert-point-cause-grid');
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
        //   payload: card_html or ""
        //   id: itemId
        //   parentid: parentId
        // }

        // parse the payload as json
        const payload = JSON.parse(data);

        // Create
        if (payload.action === "create") {
          // read current failure mode id from dom
          const failureModeId = parseInt(document.getElementById('current-values').dataset.collaborationFailuremode);
          // if id === parent id of new card
          // then set state = "" else state = "hidden"
          const state = (failureModeId === payload.parentid) ? "" : "hidden"

          const newCard = `<div class="${payload.type}-card ${state}">${payload.body}</div>`;
          if (payload.type === "cause") {
            insertPointCauseGrid.insertAdjacentHTML('beforebegin', newCard)
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
            card.parentNode.remove();
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
