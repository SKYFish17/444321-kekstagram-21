'use strict';

(function () {
  var imgUploadContainer = document.querySelector('.img-upload');
  var imgUploadInput = imgUploadContainer.querySelector('.img-upload__input');
  var picturesContainer = document.querySelector('.pictures');

  imgUploadInput.addEventListener('change', function () {
    window.dialogForm.openUploadOverlay();
  });

  var setPicturesHandlers = function (data) {
    picturesContainer.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('picture__img')) {
        window.dialogPreview.openBigPicture(evt.target.attributes.src.value, data);
      }
    }, true);


    picturesContainer.addEventListener('keydown', function (evt) {
      var pictureAtLink = evt.target.querySelector('.picture__img');

      if (evt.code === 'Enter') {
        window.dialogPreview.openBigPicture(pictureAtLink.attributes.src.value, data);
      }
    }, true);
  };

  window.main = {
    setPicturesHandlers: setPicturesHandlers
  };
})();
