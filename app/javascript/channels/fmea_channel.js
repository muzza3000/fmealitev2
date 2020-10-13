import consumer from "./consumer";

export const initFmeaCable = () => {
  const causeContainer = document.getElementById('cause-grid');
  if (causeContainer) {
    const id = causeContainer.dataset.fmeaId;
    console.log("cable connected");
    console.log(id);

    consumer.subscriptions.create({ channel: "FmeaCollaborationChannel", id: id }, {
      received(data) {
        // data should be json
        // type: cause / effect
        // action: add/remove
        // payload: (html or ID)
        // if remove - remove element from page
        // if add - append the html
        const card = `<div class="cause-card">${data}</div>`
        console.log(card);
        causeContainer.insertAdjacentHTML('beforeend', card)
      },
    });
  }
}