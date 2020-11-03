'use strict';

(() => {
  const body = document.querySelector(`body`);

  const openModal = () => {
    body.classList.add(`modal-open`);
  };

  const closeModal = () => {
    body.classList.remove(`modal-open`);
  };

  window.dialog = {
    openModal,
    closeModal
  };
})();
