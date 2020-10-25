'use strict';

(() => {
  const StatusCode = {
    OK: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
  };

  const URL_LOAD = `https://javascript.pages.academy/kekstagram/data`;
  const URL_SAVE = `https://javascript.pages.academy/kekstagram`;
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

        case StatusCode.BadRequest:
          error = `Неверный запрос`;
          break;

        case StatusCode.Unauthorized:
          error = `Пользователь не авторизован`;
          break;

        case StatusCode.NotFound:
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

  const load = (onLoad, onError) => {

    const xhr = configuresXhrRequest(URL_LOAD, TIMEOUT_IN_MS, `GET`, `json`);

    sendXhrRequest(xhr);
    processesXhrRequest(xhr, onLoad, onError, xhr.response);
  };

  const save = (data, onLoad, onError) => {

    const xhr = configuresXhrRequest(URL_SAVE, TIMEOUT_IN_MS, `POST`, `json`);

    sendXhrRequest(xhr, data);
    processesXhrRequest(xhr, onLoad, onError);
  };

  window.backend = {
    load,
    save
  };
})();
