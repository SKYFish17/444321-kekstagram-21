'use strict';

(() => {
  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getRandomValue = (arr) => arr[getRandomNumber(0, arr.length - 1)];

  const getHtmlElement = (tag, className) => {
    let htmlElement = document.createElement(tag);
    htmlElement.classList.add(className);

    return htmlElement;
  };

  window.util = {
    getRandomNumber,
    getRandomValue,
    getHtmlElement
  };
})();
