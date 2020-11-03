'use strict';

(() => {
  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadInput = imgUploadContainer.querySelector(`.img-upload__input`);
  const picturesContainer = document.querySelector(`.pictures`);

  imgUploadInput.addEventListener(`change`, () => {
    window.dialogForm.openUploadOverlay();
  });

  const setPicturesHandlers = (data) => {
    picturesContainer.addEventListener(`click`, (evt) => {
      if (evt.target.classList.contains(`picture__img`)) {
        window.dialogPreview.openBigPicture(evt.target.attributes.src.value, data);
      }
    }, true);


    picturesContainer.addEventListener(`keydown`, (evt) => {
      const pictureAtLink = evt.target.querySelector(`.picture__img`);

      if (evt.code === `Enter`) {
        window.dialogPreview.openBigPicture(pictureAtLink.attributes.src.value, data);
      }
    }, true);
  };

  window.main = {
    setPicturesHandlers
  };
})();
