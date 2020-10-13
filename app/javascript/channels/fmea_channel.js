import consumer from "./consumer";

export const initFmeaCable = () => {
  const causeEffectContainer = document.getElementById('cause-effect-collaboration');
  const causeGrid = document.getElementById('cause-grid');
  const effectGrid = document.getElementById('effect-grid');

  if ((causeEffectContainer)&&(causeGrid)&&(effectGrid)) {
    const id = causeEffectContainer.dataset.fmeaId;
    console.log(`cable connected to FMEA ${id}`);

    consumer.subscriptions.create({ channel: "FmeaCollaborationChannel", id: id }, {
      received(data) {
        // can receive events (create, update, destroy) from cause or effect controller
        // data should be json
        // type: cause / effect
        // action: add/remove
        // payload: (html or ID)
        // if remove - remove element from page
        // if add - append the html
        const payload = JSON.parse(data);

        // Create action
        if (payload.action === "create"){
          const card = `<div class="cause-card">${payload.body}</div>`
          if (payload.type === "cause") {
            causeGrid.insertAdjacentHTML('beforeend', card)
          } else if (payload.type === "effect") {
            effectGrid.insertAdjacentHTML('beforeend', card)
          }
        }

        // Destroy action
        if (payload.action === "destroy") {
          // get card from document
          const card = document.getElementById(`${payload.type}-${payload.body}`)
          console.log(card);

          if (card) {
            card.parentNode.removeChild(card);
          }
        }

        // Update action




        // const card = `<div class="cause-card">${data}</div>`

        // causeContainer.insertAdjacentHTML('beforeend', card)
      },
    });
  }
}