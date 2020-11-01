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
    const bigger = (parseInt(scaleValue[0], 10) + SCALE_STEP) / 100;
    const smaller = (parseInt(scaleValue[0], 10) - SCALE_STEP) / 100;

    switch (checkedButton) {
      case scaleBiggerBtn:
        scaleInput.value = `${bigger * 100}%`;
        imgUploadPreviewContainer.style.transform = `scale(${bigger})`;
        break;
      case scaleSmallerBtn:
        scaleInput.value = `${smaller * 100}%`;
        imgUploadPreviewContainer.style.transform = `scale(${smaller})`;
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
