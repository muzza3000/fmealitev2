import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["source", "copybutton"]

  connect() {
    // if statement to only display copy button if browser
    // support the action
    if (document.queryCommandSupported("copy")) {
      this.copybuttonTarget.classList.add("copy-button-supported")
    }
  }

  shareCollaborationLink() {
    // get the failure mode and fmea Id from the DOM
    const failureModeId = parseInt(document.getElementById('current-values').dataset.collaborationFailuremode);
    const fmeaId = parseInt(document.getElementById('current-values').dataset.collaborationFmea);

    // formulate shareable link
    const shareUrl = `${window.location.origin}/fmeas/${fmeaId}/collaboration/?failure_mode_id=${failureModeId}`

    this.copyToClipBoard(shareUrl);
  }

  shareFmeaLink() {
    // get the fmea url from the dom
    const fmeaId = this.copybuttonTarget.dataset.fmeaId

    // formulate shareable link
    const shareUrl = `${window.location.origin}/fmeas/${fmeaId}/edit`

    this.copyToClipBoard(shareUrl);
  }

  copy() {
    const textToCopy = this.sourceTarget.innerText;
    this.copyToClipBoard(textToCopy);
  }

  private

  copyToClipBoard(textToCopy) {
    // In order to copy you must select the text, therefore you must
    // use and input element. Therefore this is temporarily created
    // and then removed to perform the copy action.
    let myTempInputElement = document.createElement("input");
    myTempInputElement.type = "text";
    myTempInputElement.value = textToCopy;

    document.body.appendChild(myTempInputElement);

    myTempInputElement.select();
    document.execCommand("copy");

    document.body.removeChild(myTempInputElement);
  }
}
