'use strict';

(() => {
  const HASHTAG_MAX_LENGTH = 20;
  const MAX_NUM_OF_TAGS = 5;

  const imgUploadContainer = document.querySelector(`.img-upload`);
  const imgUploadForm = imgUploadContainer.querySelector(`.img-upload__form`);
  const hashtagsInput = imgUploadContainer.querySelector(`.text__hashtags`);

  const checksDuplicateTags = (tags) => {
    let areThereDuplicateTags = false;

    for (let i = 0; i < tags.length; i++) {
      tags[i] = tags[i].toLowerCase();
    }

    for (let j = 0; j < tags.length - 1; j++) {
      for (let k = j + 1; k < tags.length; k++) {
        if (tags[j] === tags[k]) {
          areThereDuplicateTags = true;
        }
      }
    }

    return areThereDuplicateTags;
  };

  const validateTags = () => {
    const hashtagsText = hashtagsInput.value;
    const hashtags = hashtagsText.split(` `);

    for (let i = 0; i < hashtags.length; i++) {
      const re = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
      const hashtagLength = hashtags[i].length;

      if (hashtags[i].charAt(0) !== `#` && hashtags[i].charAt(0) !== ``) {
        hashtagsInput.setCustomValidity(`Тег должен начинаться со знака "#"`);
      } else if (hashtags[i] === `#`) {
        hashtagsInput.setCustomValidity(`Хеш-тег не может состоять только из одной решётки`);
      } else if (!re.test(hashtags[i]) && hashtags[i].charAt(0) !== ``) {
        hashtagsInput.setCustomValidity(`Текст после решётки должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`);
      } else if (hashtagLength > HASHTAG_MAX_LENGTH) {
        hashtagsInput.setCustomValidity(`Максимальная длина хэштега - 20 символов, удалите ` + (hashtagLength - HASHTAG_MAX_LENGTH) + ` симв.`);
      } else if (checksDuplicateTags(hashtags)) {
        hashtagsInput.setCustomValidity(`Хеш-теги не должны повторяться. #ХэшТег и #хэштег считаются одним и тем же тегом`);
      } else if (hashtags.length > MAX_NUM_OF_TAGS) {
        hashtagsInput.setCustomValidity(`Возможно ввести лишь 5 тегов`);
      } else {
        hashtagsInput.setCustomValidity(``);
      }
    }
    imgUploadForm.reportValidity();
  };

  window.formValidate = {
    validateTags
  };
})();
