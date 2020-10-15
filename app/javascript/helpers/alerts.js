export const copyAlertShow = (text) => {
  // grab alert element
  const alertEl = document.getElementById('copyalert');
  // update the inner text
  alertEl.innerHTML = `<strong>${text}</strong> copied to clipboard!`;
  // remove the hidden style
  alertEl.classList.remove('hidden');
};
export const copyAlertHide = (text) => {
  // grab alert element
  const alertEl = document.getElementById('copyalert');
  // apply the style
  alertEl.classList.add('hidden');
};
export const copyAlert = (text) => {
  // show the alert
  copyAlertShow(text);
  // hide after some fixed time
  setTimeout(() => copyAlertHide(text), 5000);
};