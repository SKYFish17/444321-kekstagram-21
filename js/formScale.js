'use strict';

(() => {
  const SCALE_STEP = 25;
  const MIN_SCALE = 25;
  const MAX_SCALE = 100;

  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadOverlay = imgUploadContainer.querySelector(`.img-upload__overlay`);
  const imgUploadPreviewContainer = imgUploadOverlay.querySelector(`.img-upload__preview`);
  const scaleContainer = imgUploadContainer.querySelector(`.scale`);
  const scaleInput = scaleContainer.querySelector(`.scale__control--value`);
  const scaleBiggerBtn = scaleContainer.querySelector(`.scale__control--bigger`);
  const scaleSmallerBtn = scaleContainer.querySelector(`.scale__control--smaller`);

  const changeScaleValue = (checkedButton) => {
    const scaleValue = scaleInput.value.split(`%`);
    const bigger = Number(scaleValue[0]) + SCALE_STEP;
    const smaller = Number(scaleValue[0]) - SCALE_STEP;

    switch (checkedButton) {
      case scaleBiggerBtn:
        scaleInput.value = `${bigger}%`;
        imgUploadPreviewContainer.style.transform = `scale(${bigger / 100})`;
        break;
      case scaleSmallerBtn:
        scaleInput.value = `${smaller}%`;
        imgUploadPreviewContainer.style.transform = `scale(${smaller / 100})`;
        break;
    }
  };

  const resetScaleValue = () => {
    imgUploadPreviewContainer.style.transform = `scale(1)`;
    scaleInput.value = `100%`;
  };

  const onScaleBiggerClick = (evt) => {
    if (scaleInput.value !== (MAX_SCALE + `%`)) {
      changeScaleValue(evt.target);
    }
  };

  const onScaleBiggerPressEnter = (evt) => {
    if (evt.code === `Enter`) {
      if (scaleInput.value !== (MAX_SCALE + `%`)) {
        changeScaleValue(evt.target);
      }
    }
  };

  const onScaleSmallerClick = (evt) => {
    if (scaleInput.value !== (MIN_SCALE + `%`)) {
      changeScaleValue(evt.target);
    }
  };

  const onScaleSmallerPressEnter = (evt) => {
    if (evt.code === `Enter`) {
      if (scaleInput.value !== (MIN_SCALE + `%`)) {
        changeScaleValue(evt.target);
      }
    }
  };

  window.formScale = {
    onScaleBiggerClick,
    onScaleBiggerPressEnter,
    onScaleSmallerClick,
    onScaleSmallerPressEnter,
    resetScaleValue
  };
})();
