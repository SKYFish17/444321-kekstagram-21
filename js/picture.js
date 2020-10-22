'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');

  var buildUserPost = function (pictureData) {
    var template = document.querySelector('#picture').content.querySelector('.picture');
    var newPost = template.cloneNode(true);
    var newPostImg = newPost.querySelector('.picture__img');
    var newPostLikes = newPost.querySelector('.picture__likes');
    var newPostComments = newPost.querySelector('.picture__comments');

    newPostImg.src = pictureData.url;
    newPostLikes.textContent = pictureData.likes;
    newPostComments.textContent = pictureData.comments.length;

    return newPost;
  };

  var renderPictures = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(buildUserPost(data[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  var onLoad = function (picturesData) {
    renderPictures(picturesData);
    window.main.setPicturesHandlers(picturesData);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);
})();
