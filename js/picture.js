'use strict';

(() => {
  const picturesContainer = document.querySelector(`.pictures`);

  const buildUserPost = (pictureData) => {
    const template = document.querySelector(`#picture`).content.querySelector(`.picture`);
    const newPost = template.cloneNode(true);
    const newPostImg = newPost.querySelector(`.picture__img`);
    const newPostLikes = newPost.querySelector(`.picture__likes`);
    const newPostComments = newPost.querySelector(`.picture__comments`);

    newPostImg.src = pictureData.url;
    newPostLikes.textContent = pictureData.likes;
    newPostComments.textContent = pictureData.comments.length;

    return newPost;
  };

  const renderPictures = (data) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      fragment.appendChild(buildUserPost(data[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  const onLoad = (picturesData) => {
    renderPictures(picturesData);
    window.main.setPicturesHandlers(picturesData);
  };

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);

    node.classList.add(`download-error`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(onLoad, onError);
})();
