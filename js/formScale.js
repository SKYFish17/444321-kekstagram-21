'use strict';

(() => {
  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadOverlay = imgUploadContainer.querySelector(`.img-upload__overlay`);
  const imgUploadPreviewContainer = imgUploadOverlay.querySelector(`.img-upload__preview`);
  const scaleContainer = imgUploadContainer.querySelector(`.scale`);
  const scaleInput = scaleContainer.querySelector(`.scale__control--value`);

  const changeScaleValue = (sign) => {
    const scaleValue = scaleInput.value.split(`%`);

    switch (sign) {
      case `+`:
        scaleInput.value = parseInt(scaleValue[0], 10) + window.constants.SCALE_STEP + `%`;
        imgUploadPreviewContainer.style.transform = `scale` + `(` + (parseInt(scaleValue[0], 10) + window.constants.SCALE_STEP) / 100 + `)`;
        break;
      case `-`:
        scaleInput.value = parseInt(scaleValue[0], 10) - window.constants.SCALE_STEP + `%`;
        imgUploadPreviewContainer.style.transform = `scale` + `(` + (parseInt(scaleValue[0], 10) - window.constants.SCALE_STEP) / 100 + `)`;
        break;
    }
  };

  const resetScaleValue = () => {
    imgUploadPreviewContainer.style.transform = `scale` + `(` + 1 + `)`;
    scaleInput.value = `100%`;
  };

  const onScaleBiggerClick = () => {
    if (scaleInput.value !== (window.constants.MAX_SCALE + `%`)) {
      changeScaleValue(`+`);
    }
  };

  const onScaleBiggerPressEnter = (evt) => {
    if (evt.code === `Enter`) {
      if (scaleInput.value !== (window.constants.MAX_SCALE + `%`)) {
        changeScaleValue(`+`);
      }
    }
  };

  const onScaleSmallerClick = () => {
    if (scaleInput.value !== (window.constants.MIN_SCALE + `%`)) {
      changeScaleValue(`-`);
    }
  };

  const onScaleSmallerPressEnter = (evt) => {
    if (evt.code === `Enter`) {
      if (scaleInput.value !== (window.constants.MIN_SCALE + `%`)) {
        changeScaleValue(`-`);
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
