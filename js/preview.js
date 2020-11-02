'use strict';

(() => {
  const commentAvatarSize = {
    WIDTH: 35,
    HEIGHT: 35
  };

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
  const commentsCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const commentsList = bigPicture.querySelector(`.social__comments`);

  const buildComment = (userComment) => {
    const newComment = window.util.createHtmlElement(`li`, `social__comment`);

    const newCommentAvatar = window.util.createHtmlElement(`img`, `social__picture`);
    newCommentAvatar.src = userComment.avatar;
    newCommentAvatar.alt = userComment.name;
    newCommentAvatar.width = commentAvatarSize.WIDTH;
    newCommentAvatar.height = commentAvatarSize.HEIGHT;

    newComment.appendChild(newCommentAvatar);

    const newCommentText = window.util.createHtmlElement(`p`, `social__text`);
    newCommentText.textContent = userComment.message;

    newComment.appendChild(newCommentText);

    return newComment;
  };

  const renderUserComments = (userPost) => {
    for (let i = 0; i < userPost.comments.length; i++) {
      commentsList.appendChild(buildComment(userPost.comments[i]));
    }
  };

  const renderBigPicture = (userPost) => {
    bigPictureImg.src = userPost.url;
    bigPictureDescription.textContent = userPost.description;
    likesCount.textContent = userPost.likes;
    commentsCount.textContent = userPost.comments.length;

    renderUserComments(userPost);
  };

  commentsLoader.classList.add(`hidden`);
  commentsCount.classList.add(`hidden`);

  window.preview = {
    renderBigPicture
  };
})();
