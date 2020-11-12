'use strict';

(() => {
  const NUMBER_OF_POSTS = 25;

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCloseBtn = bigPicture.querySelector(`.big-picture__cancel`);
  const commentsList = bigPicture.querySelector(`.social__comments`);
  const likesBtn = bigPicture.querySelector(`.likes-count`);
  const commentsLoaderBtn = bigPicture.querySelector(`.comments-loader`);
  const socialCommentInput = bigPicture.querySelector(`.social__footer-text`);
  const socialCommentSubmit = bigPicture.querySelector(`.social__footer-btn`);

  const setTabPriorityBigPictureElements = (tabValue) => {
    window.util.setTabPriority(likesBtn, tabValue);
    window.util.setTabPriority(commentsLoaderBtn, tabValue);
    window.util.setTabPriority(socialCommentInput, tabValue);
    window.util.setTabPriority(socialCommentSubmit, tabValue);
    window.util.setTabPriority(bigPictureCloseBtn, tabValue);
  };

  const openBigPicture = (imgSrc, usersPosts) => {
    window.dialog.openModal();
    commentsList.innerHTML = ``;
    bigPicture.classList.remove(`hidden`);

    for (let i = 0; i < NUMBER_OF_POSTS; i++) {
      if (imgSrc === usersPosts[i].url) {
        window.preview.renderBigPicture(usersPosts[i]);
      }
    }
    document.addEventListener(`keydown`, onBigPictureEscPress);
    setTabPriorityBigPictureElements(1);
  };

  const closeBigPicture = () => {
    bigPicture.classList.add(`hidden`);
    window.dialog.closeModal();
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    setTabPriorityBigPictureElements(0);
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
