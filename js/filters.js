'use strict';

(() => {
  const RANDOM_PICTURES_NUMBERS = 10;
  const MIN_RANDOM_PICTURE_INDEX = 0;

  const picturesContainer = document.querySelector(`.pictures`);
  const picturesContainerElements = picturesContainer.children;

  const imgFilters = document.querySelector(`.img-filters`);
  const filterDefaultBtn = imgFilters.querySelector(`#filter-default`);
  const filterRandomBtn = imgFilters.querySelector(`#filter-random`);
  const filterDiscussedBtn = imgFilters.querySelector(`#filter-discussed`);

  let activeFilterBtn = filterDefaultBtn;

  const getUnrepeatRandomPicturesData = (picturesData) => {
    const unrepeatRandomPicturesNumbers = [];
    const randomPicturesData = [];
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

    for (let i = 0; i < unrepeatRandomPicturesNumbers.length; i++) {
      randomPicturesData[i] = picturesData[unrepeatRandomPicturesNumbers[i]];
    }

    return randomPicturesData;
  };

  const getSortedByNumberOfCommentsPicturesData = (picturesData) => {
    let sortedPicturesData;

    const compare = (a, b) => b.comments.length - a.comments.length;

    sortedPicturesData = picturesData.slice().sort(compare);

    return sortedPicturesData;
  };

  const clearScreen = () => {
    for (let i = picturesContainerElements.length - 1; i >= 0; i--) {
      if (picturesContainerElements[i].classList.contains(`picture`)) {
        picturesContainerElements[i].remove();
      }
    }
  };

  const changeActiveFilterBtn = (btn) => {
    activeFilterBtn.classList.remove(`img-filters__button--active`);
    activeFilterBtn = btn;
    activeFilterBtn.classList.add(`img-filters__button--active`);
  };

  const applyFilter = (evt, data) => {
    evt.preventDefault();
    clearScreen();
    window.picture.render(data);
  };

  const updatePictures = window.debounce((evt, picturesData) => {
    applyFilter(evt, picturesData);
  });

  const onBtnClick = (evt, picturesData, btn) => {
    let data = picturesData;

    if (btn === filterRandomBtn) {
      data = getUnrepeatRandomPicturesData(picturesData);
    } else if (btn === filterDiscussedBtn) {
      data = getSortedByNumberOfCommentsPicturesData(picturesData);
    }
    updatePictures(evt, data);
    changeActiveFilterBtn(btn);
  };

  window.filters = {
    onBtnClick
  };
})();
