'use strict';

(() => {
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);
  const commentsList = bigPicture.querySelector(`.social__comments`);

  const openBigPicture = (imgSrc, usersPosts) => {
    window.dialog.openModal();
    commentsList.innerHTML = ``;
    bigPicture.classList.remove(`hidden`);

    for (let i = 0; i < window.constants.NUMBER_OF_POSTS; i++) {
      if (imgSrc === usersPosts[i].url) {
        window.preview.render(usersPosts[i]);
      }
    }
    document.addEventListener(`keydown`, onBigPictureEscPress);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    window.dialog.closeModal();
    document.removeEventListener(`keydown`, onBigPictureEscPress);
  };

  bigPictureCloseBtn.addEventListener(`click`, () => {
    closeBigPicture();
  });

  bigPictureCloseBtn.addEventListener(`keydown`, (evt) => {
    if (evt.code === `Enter`) {
      closeBigPicture();
    }
  });

  const onBigPictureEscPress = (evt) => {
    if (evt.code === `Escape`) {
      evt.preventDefault();
      closeBigPicture();
    }
  };

  window.dialogPreview = {
    openBigPicture
  };
})();
