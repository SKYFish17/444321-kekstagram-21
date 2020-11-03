'use strict';

(() => {
  const SCALE_STEP = 25;
  const MIN_SCALE = 25;
  const MAX_SCALE = 100;
  const MAX_PERCENT = MAX_SCALE;

  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadOverlay = imgUploadContainer.querySelector(`.img-upload__overlay`);
  const imgUploadPreviewContainer = imgUploadOverlay.querySelector(`.img-upload__preview`);
  const scaleContainer = imgUploadContainer.querySelector(`.scale`);
  const scaleInput = scaleContainer.querySelector(`.scale__control--value`);
  const scaleBiggerBtn = scaleContainer.querySelector(`.scale__control--bigger`);
  const scaleSmallerBtn = scaleContainer.querySelector(`.scale__control--smaller`);

  const changeScaleValue = (checkedButton) => {
    const scaleValue = scaleInput.value.split(`%`);
    const increaseValue = Number(scaleValue[0]) + SCALE_STEP;
    const decreaseValue = Number(scaleValue[0]) - SCALE_STEP;

    switch (checkedButton) {
      case scaleBiggerBtn:
        scaleInput.value = `${increaseValue}%`;
        imgUploadPreviewContainer.style.transform = `scale(${increaseValue / MAX_PERCENT})`;
        break;
      case scaleSmallerBtn:
        scaleInput.value = `${decreaseValue}%`;
        imgUploadPreviewContainer.style.transform = `scale(${decreaseValue / MAX_PERCENT})`;
        break;
    }
  };

  const resetScaleValue = () => {
    imgUploadPreviewContainer.style.transform = `scale(1)`;
    scaleInput.value = `${MAX_SCALE}%`;
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
