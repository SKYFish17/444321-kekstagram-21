'use strict';

//  добавляет этот небольшой комментарий в коде, чтобы открыть следующее задание

(() => {
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  const URL_DOWNLOAD = `https://21.javascript.pages.academy/kekstagram/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram`;
  const TIMEOUT_IN_MS = 10000;

  const configureXhrRequest = (url, timeout, method, respType) => {

    const xhr = new XMLHttpRequest();

    xhr.responseType = respType;
    xhr.timeout = timeout;
    xhr.open(method, url);

    return xhr;
  };

  const processesXhrRequest = (xhr, onLoad, onError, isNeedXhrResp) => {

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case StatusCode.OK:
          if (isNeedXhrResp) {
            onLoad(xhr.response);
          } else {
            onLoad();
          }
          break;

        case StatusCode.BAD_REQUEST:
          error = `Неверный запрос`;
          break;

        case StatusCode.UNAUTHORIZED:
          error = `Пользователь не авторизован`;
          break;

        case StatusCode.NOT_FOUND:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });
  };

  const load = (onLoad, onError) => {

    const xhr = configureXhrRequest(URL_DOWNLOAD, TIMEOUT_IN_MS, `GET`, `json`);

    xhr.send();
    processesXhrRequest(xhr, onLoad, onError, true);
  };

  const save = (data, onLoad, onError) => {

    const xhr = configureXhrRequest(URL_UPLOAD, TIMEOUT_IN_MS, `POST`, `json`);

    xhr.send(data);
    processesXhrRequest(xhr, onLoad, onError, false);
  };

  window.backend = {
    load,
    save
  };
})();
