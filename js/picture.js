'use strict';

(() => {
  const RANDOM_PICTURES_NUMBERS = 10;
  const MIN_RANDOM_PICTURE_INDEX = 0;

  const picturesContainer = document.querySelector(`.pictures`);

  const imgFilters = document.querySelector(`.img-filters`);
  const filterDefaultBtn = imgFilters.querySelector(`#filter-default`);
  const filterRandomBtn = imgFilters.querySelector(`#filter-random`);
  const filterDiscussedBtn = imgFilters.querySelector(`#filter-discussed`);

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

  const getUnrepeatRandomPicturesData = (picturesData) => {
    let unrepeatRandomPicturesNumbers = [];
    let currentRandomNumber;

    while (unrepeatRandomPicturesNumbers.length < RANDOM_PICTURES_NUMBERS) {
      let isUnrepeatRandomPictureNumber = true;

      currentRandomNumber = window.util.getRandomNumber(MIN_RANDOM_PICTURE_INDEX, picturesData.length - 1);

      for (let i = 0; i < unrepeatRandomPicturesNumbers.length; i++) {
        if (unrepeatRandomPicturesNumbers[i] === currentRandomNumber) {
          isUnrepeatRandomPictureNumber = false;
        }
      }

      if (isUnrepeatRandomPictureNumber) {
        unrepeatRandomPicturesNumbers.push(currentRandomNumber);
      }
    }

    let randomPicturesData = [];

    for (let i = 0; i < unrepeatRandomPicturesNumbers.length; i++) {
      randomPicturesData[i] = picturesData[unrepeatRandomPicturesNumbers[i]];
    }

    return randomPicturesData;
  };


  const onLoad = (picturesData) => {
    renderPictures(picturesData);
    window.main.setPicturesHandlers(picturesData);

    imgFilters.classList.remove(`img-filters--inactive`);

    let activeFilterBtn = filterDefaultBtn;
    let nodes = picturesContainer.children;

    filterRandomBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].classList.contains(`picture`)) {
          nodes[i].remove();
        }
      }

      // подстановка случайных данных для отрисовки
      renderPictures(getUnrepeatRandomPicturesData(picturesData));

      activeFilterBtn.classList.remove(`img-filters__button--active`);
      activeFilterBtn = filterRandomBtn;
      filterRandomBtn.classList.add(`img-filters__button--active`);
    });

    filterDefaultBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      for (let i = nodes.length - 1; i >= 0; i--) {
        if (nodes[i].classList.contains(`picture`)) {
          nodes[i].remove();
        }
      }

      renderPictures(picturesData);

      activeFilterBtn.classList.remove(`img-filters__button--active`);
      activeFilterBtn = filterDefaultBtn;
      filterDefaultBtn.classList.add(`img-filters__button--active`);
    });

  };

  const onError = (errorMessage) => {
    const node = document.createElement(`div`);

    node.classList.add(`download-error`);
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(onLoad, onError);
})();
