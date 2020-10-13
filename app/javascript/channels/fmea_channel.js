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

        // expected data should be json
        // {
        //   type: cause / effect
        //   action: create / destroy / update
        //   payload: card_html or Id
        // }

        const payload = JSON.parse(data);

        console.log(payload)

        // Create
        if (payload.action === "create") {
          const newCard = `<div class="${payload.type}-card">${payload.body}</div>`
          if (payload.type === "cause") {
            causeGrid.insertAdjacentHTML('beforeend', newCard)
          } else if (payload.type === "effect") {
            effectGrid.insertAdjacentHTML('beforeend', newCard)
          }
        }

        // Destroy
        if (payload.action === "destroy") {
          // get card from document
          const card = document.getElementById(`${payload.type}-${payload.id}`)
          console.log(card);

          if (card) {
            card.parentNode.removeChild(card);
          }
        }

        // Update
        if (payload.action === "update") {

          // get card from document
          let card = document.getElementById(`${payload.type}-${payload.id}`)


          // if card exists in the dom
          if (card) {
            const newCard = `<div class="${payload.type}-card">${payload.body}</div>`;

            console.log(newCard);

            card.innerHTML = newCard;
          }
        }


      },
    });
  }
}