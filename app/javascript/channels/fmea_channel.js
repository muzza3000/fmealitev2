import consumer from "./consumer";

export const initFmeaCable = () => {
  const causeContainer = document.getElementById('cause-grid');
  if (causeContainer) {
    const id = causeContainer.dataset.fmeaId;
    console.log("cable connected");
    console.log(id);

    consumer.subscriptions.create({ channel: "FmeaCollaborationChannel", id: id }, {
      received(data) {
        const card = `<div class="cause-card">${data}</div>`
        console.log(card);
        causeContainer.insertAdjacentHTML('beforeend', card)
      },
    });
  }
}