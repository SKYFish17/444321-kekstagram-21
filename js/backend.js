'use strict';

(() => {
  const StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  const URL_DOWNLOAD = `https://javascript.pages.academy/kekstagram/data`;
  const URL_UPLOAD = `https://javascript.pages.academy/kekstagram`;
  const TIMEOUT_IN_MS = 10000;

  const configuresXhrRequest = (url, timeout, method, respType) => {

    const xhr = new XMLHttpRequest();

    xhr.responseType = respType;
    xhr.timeout = timeout;
    xhr.open(method, url);

    return xhr;
  };

  const processesXhrRequest = (xhr, onLoad, onError) => {

    xhr.addEventListener(`load`, () => {
      let error;

      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
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

  const sendXhrRequest = (xhr, data = null) => {
    xhr.send(data);
  };

  const download = (onLoad, onError) => {

    const xhr = configuresXhrRequest(URL_DOWNLOAD, TIMEOUT_IN_MS, `GET`, `json`);

    sendXhrRequest(xhr);
    processesXhrRequest(xhr, onLoad, onError, xhr.response);
  };

  const upload = (data, onLoad, onError) => {

    const xhr = configuresXhrRequest(URL_UPLOAD, TIMEOUT_IN_MS, `POST`, `json`);

    sendXhrRequest(xhr, data);
    processesXhrRequest(xhr, onLoad, onError);
  };

  window.backend = {
    download,
    upload
  };
})();
