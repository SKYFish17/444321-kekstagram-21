'use strict';

(() => {
  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadOverlay = imgUploadContainer.querySelector(`.img-upload__overlay`);
  const imgUploadPreviewContainer = imgUploadOverlay.querySelector(`.img-upload__preview`);
  const imgUploadPreview = imgUploadPreviewContainer.querySelector(`img`);
  const effectSlider = imgUploadOverlay.querySelector(`.effect-level`);
  const effectLevelContainer = imgUploadOverlay.querySelector(`.effect-level`);
  const effectLevelPin = effectLevelContainer.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevelContainer.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevelContainer.querySelector(`.effect-level__value`);
  // const effectsRadios = imgUploadContainer.querySelectorAll(`.effects__radio`);

  let previousEffectName = ``;

  const onEffectsItemClick = (evt) => {
    const effectLabel = evt.target.nextElementSibling.querySelector(`.effects__preview`);
    const effectName = effectLabel.classList[1];

    if (previousEffectName) {
      imgUploadPreview.classList.remove(previousEffectName);
    }

    if (effectName === `effects__preview--none`) {
      effectSlider.classList.add(`hidden`);
    } else {
      effectSlider.classList.remove(`hidden`);
    }

    previousEffectName = effectName;
    imgUploadPreview.classList.add(effectName);
    changeEffectLevel(window.constants.END_PIN_POSITION);
  };

  const resetEffects = () => {
    imgUploadPreview.classList = ``;
    imgUploadPreview.style.filter = ``;

    // for (let i = 0; i < effectsRadios.length; i++) {
    //   if (effectsRadios[i].checked) {
    //     console.log(i);
    //     effectsRadios[i].removeAttribute(`checked`);
    //     effectsRadios[0].setAttribute(`checked`, `checked`);

    //     break;
    //   }
    // }
  };

  const getFilter = (effectType, effectMinLevel, effectMaxLevel, unit, pinPosition) => {
    let effectLevel;
    let filter;
    const effectLevelDifference = effectMaxLevel - effectMinLevel;

    effectLevel = effectMinLevel + pinPosition / window.constants.END_PIN_POSITION * effectLevelDifference;

    if (unit !== `none`) {
      filter = effectType + `(` + effectLevel + unit + `)`;
    } else {
      filter = effectType + `(` + effectLevel + `)`;
    }

    return filter;
  };

  const getRatio = (numberOne, numberTwo, sign) => {
    let ratio;

    if (sign) {
      ratio = numberOne / numberTwo * window.constants.MAX_PERCENT + sign;
    } else {
      ratio = numberOne / numberTwo * window.constants.MAX_PERCENT;
    }

    return ratio;
  };

  const renderActualEffectLevel = (pinPosition) => {
    effectLevelPin.style.left = getRatio(pinPosition, window.constants.END_PIN_POSITION, `%`);
    effectLevelDepth.style.width = getRatio(pinPosition, window.constants.END_PIN_POSITION, `%`);
    effectLevelValue.value = getRatio(pinPosition, window.constants.END_PIN_POSITION);
  };

  const changeEffectLevel = (pinPosition) => {

    switch (imgUploadPreview.className) {
      case `effects__preview--none`:
        imgUploadPreview.style.filter = ``;
        break;
      case `effects__preview--chrome`:
        imgUploadPreview.style.filter = getFilter(`grayscale`, 0, 1, `none`, pinPosition);
        break;
      case `effects__preview--sepia`:
        imgUploadPreview.style.filter = getFilter(`sepia`, 0, 1, `none`, pinPosition);
        break;
      case `effects__preview--marvin`:
        imgUploadPreview.style.filter = getFilter(`invert`, 0, 100, `%`, pinPosition);
        break;
      case `effects__preview--phobos`:
        imgUploadPreview.style.filter = getFilter(`blur`, 0, 3, `px`, pinPosition);
        break;
      case `effects__preview--heat`:
        imgUploadPreview.style.filter = getFilter(`brightness`, 1, 3, `none`, pinPosition);
        break;
    }
    renderActualEffectLevel(pinPosition);
  };

  effectLevelPin.addEventListener(`mousedown`, (evt) => {

    let startCoords = {
      x: evt.clientX,
    };

    const onEffectLevelPinMouseMove = (moveEvt) => {

      const shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      const pinPosition = effectLevelPin.offsetLeft - shift.x;

      if (pinPosition >= window.constants.START_PIN_POSITION && pinPosition <= window.constants.END_PIN_POSITION) {
        changeEffectLevel(pinPosition);
      }
    };

    const onEffectLevelPinMouseUp = () => {

      document.removeEventListener(`mousemove`, onEffectLevelPinMouseMove);
      document.removeEventListener(`mouseup`, onEffectLevelPinMouseUp);
    };

    document.addEventListener(`mousemove`, onEffectLevelPinMouseMove);
    document.addEventListener(`mouseup`, onEffectLevelPinMouseUp);
  });

  window.formEffects = {
    onEffectsItemClick,
    resetEffects
  };
})();
