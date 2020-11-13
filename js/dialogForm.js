'use strict';

(() => {
  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadOverlay = imgUploadContainer.querySelector(`.img-upload__overlay`);
  const imgUploadCancel = imgUploadContainer.querySelector(`.img-upload__cancel`);

  const hashtagsInput = imgUploadContainer.querySelector(`.text__hashtags`);
  const commentInput = imgUploadContainer.querySelector(`.text__description`);

  const effectsList = imgUploadOverlay.querySelector(`.effects__list`);
  const effectsPreviewNone = effectsList.querySelector(`#effect-none`);
  const effectSlider = imgUploadOverlay.querySelector(`.effect-level`);

  const scaleContainer = imgUploadContainer.querySelector(`.scale`);
  const scaleSmaller = scaleContainer.querySelector(`.scale__control--smaller`);
  const scaleBigger = scaleContainer.querySelector(`.scale__control--bigger`);

  const main = document.querySelector(`main`);
  const templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
  const successOverlay = templateSuccess.cloneNode(true);
  const successOverlayInner = successOverlay.querySelector(`.success__inner`);
  const closeSuccessBtn = successOverlay.querySelector(`.success__button`);

  const templateError = document.querySelector(`#error`).content.querySelector(`.error`);
  const errorOverlay = templateError.cloneNode(true);
  const errorOverlayInner = errorOverlay.querySelector(`.error__inner`);
  const closeErrorBtn = errorOverlay.querySelector(`.error__button`);

  const openUploadOverlay = () => {
    window.dialog.openModal();
    imgUploadOverlay.classList.remove(`hidden`);

    hashtagsInput.addEventListener(`input`, window.formHashtags.validate);

    document.addEventListener(`keydown`, onUploadOverlayEscPress);

    scaleBigger.addEventListener(`click`, window.formScale.onBiggerBtnClick);
    scaleBigger.addEventListener(`keydown`, window.formScale.onBiggerBtnPressEnter);

    scaleSmaller.addEventListener(`click`, window.formScale.onSmallerBtnClick);
    scaleSmaller.addEventListener(`keydown`, window.formScale.onSmallerBtnPressEnter);
    effectsList.addEventListener(`change`, window.formEffects.onItemClick, true);

    if (effectsPreviewNone.checked) {
      effectSlider.classList.add(`hidden`);
    }
  };

  const closeUploadOverlay = () => {
    window.dialog.closeModal();
    imgUploadOverlay.classList.add(`hidden`);

    hashtagsInput.removeEventListener(`input`, window.formHashtags.validate);
    hashtagsInput.setCustomValidity(``);

    document.removeEventListener(`keydown`, onUploadOverlayEscPress);

    scaleBigger.removeEventListener(`click`, window.formScale.onBiggerBtnClick);
    scaleBigger.removeEventListener(`keydown`, window.formScale.onBiggerBtnPressEnter);

    scaleSmaller.removeEventListener(`click`, window.formScale.onSmallerBtnClick);
    scaleSmaller.removeEventListener(`keydown`, window.formScale.onSmallerBtnPressEnter);
    window.formScale.resetValue();

    effectsList.removeEventListener(`change`, window.formEffects.onItemClick, true);
    window.formEffects.reset();
  };

  const onUploadOverlayEscPress = (evt) => {
    if (evt.code === `Escape` && evt.target !== hashtagsInput && evt.target !== commentInput) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  };

  const onSuccessOverlayEscPress = (evt) => {
    if (evt.code === `Escape`) {
      evt.preventDefault();
      successOverlay.remove();

      document.removeEventListener(`keydown`, onSuccessOverlayEscPress);
    }
  };

  const onSuccessOverlayEnterPress = (evt) => {
    if (evt.code === `Enter`) {
      evt.preventDefault();
      successOverlay.remove();

      closeSuccessBtn.removeEventListener(`keydown`, onSuccessOverlayEnterPress);
    }
  };

  const outSuccessOverlayInnerClick = (evt) => {
    if (evt.target !== successOverlayInner) {
      successOverlay.remove();

      successOverlay.removeEventListener(`click`, outSuccessOverlayInnerClick);
    }
  };

  const onErrorOverlayEscPress = (evt) => {
    if (evt.code === `Escape`) {
      evt.preventDefault();
      errorOverlay.remove();

      document.removeEventListener(`keydown`, onErrorOverlayEscPress);
    }
  };

  const onErrorOverlayEnterPress = (evt) => {
    if (evt.code === `Enter`) {
      evt.preventDefault();
      errorOverlay.remove();

      closeErrorBtn.removeEventListener(`keydown`, onErrorOverlayEnterPress);
    }
  };

  const outErrorOverlayInnerClick = (evt) => {
    if (evt.target !== errorOverlayInner) {
      errorOverlay.remove();

      errorOverlay.removeEventListener(`click`, outErrorOverlayInnerClick);
    }
  };

  const onLoad = () => {
    main.insertAdjacentElement(`afterbegin`, successOverlay);

    closeSuccessBtn.addEventListener(`click`, () => {
      successOverlay.remove();
    });

    closeSuccessBtn.addEventListener(`keydown`, onSuccessOverlayEnterPress);
    successOverlay.addEventListener(`click`, outSuccessOverlayInnerClick);
    document.addEventListener(`keydown`, onSuccessOverlayEscPress);

    closeUploadOverlay();
  };

  const onError = () => {
    main.insertAdjacentElement(`afterbegin`, errorOverlay);

    closeErrorBtn.addEventListener(`click`, () => {
      errorOverlay.remove();
    });

    closeErrorBtn.addEventListener(`keydown`, onErrorOverlayEnterPress);
    errorOverlay.addEventListener(`click`, outErrorOverlayInnerClick);
    document.addEventListener(`keydown`, onErrorOverlayEscPress);

    closeUploadOverlay();
  };

  imgUploadCancel.addEventListener(`click`, () => {
    closeUploadOverlay();
  });

  window.formEffects.imgUploadForm.addEventListener(`submit`, (evt) => {
    window.backend.save(new FormData(window.formEffects.imgUploadForm), onLoad, onError);
    evt.preventDefault();
  });

  window.dialogForm = {
    openUploadOverlay
  };
})();
