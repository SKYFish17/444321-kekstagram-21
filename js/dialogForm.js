'use strict';

(() => {
  const imgUploadContainer = document.querySelector(`.img-upload`);

  const imgUploadInput = imgUploadContainer.querySelector(`.img-upload__input`);
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

  const openUploadOverlay = () => {
    window.dialog.openModal();
    imgUploadOverlay.classList.remove(`hidden`);

    hashtagsInput.addEventListener(`input`, window.formValidate.validateTags);

    document.addEventListener(`keydown`, onUploadOverlayEscPress);

    scaleBigger.addEventListener(`click`, window.formScale.onScaleBiggerClick);
    scaleBigger.addEventListener(`keydown`, window.formScale.onScaleBiggerPressEnter);

    scaleSmaller.addEventListener(`click`, window.formScale.onScaleSmallerClick);
    scaleSmaller.addEventListener(`keydown`, window.formScale.onScaleSmallerPressEnter);
    effectsList.addEventListener(`change`, window.formEffects.onEffectsItemClick, true);

    if (effectsPreviewNone.checked) {
      effectSlider.classList.add(`hidden`);
    }
  };

  const closeUploadOverlay = () => {
    window.dialog.closeModal();
    imgUploadOverlay.classList.add(`hidden`);
    imgUploadInput.value = ``;

    hashtagsInput.removeEventListener(`input`, window.formValidate.validateTags);

    document.removeEventListener(`keydown`, onUploadOverlayEscPress);

    scaleBigger.removeEventListener(`click`, window.formScale.onScaleBiggerClick);
    scaleBigger.removeEventListener(`keydown`, window.formScale.onScaleBiggerPressEnter);

    scaleSmaller.removeEventListener(`click`, window.formScale.onScaleSmallerClick);
    scaleSmaller.removeEventListener(`keydown`, window.formScale.onScaleSmallerPressEnter);
    window.formScale.resetScaleValue();

    effectsList.removeEventListener(`change`, window.formEffects.onEffectsItemClick, true);
    window.formEffects.resetEffects();
  };

  const onUploadOverlayEscPress = (evt) => {
    if (evt.code === `Escape` && evt.target !== hashtagsInput && evt.target !== commentInput) {
      evt.preventDefault();
      closeUploadOverlay();
    }
  };

  imgUploadCancel.addEventListener(`click`, () => {
    closeUploadOverlay();
  });

  window.dialogForm = {
    openUploadOverlay
  };
})();
