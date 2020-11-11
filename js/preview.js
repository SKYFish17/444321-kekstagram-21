'use strict';

(() => {
  const CommentAvatarSize = {
    WIDTH: 35,
    HEIGHT: 35
  };

  const COMMENTS_TO_SHOW = 5;

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const bigPictureDescription = bigPicture.querySelector(`.social__caption`);
  const commentsCountShown = bigPicture.querySelector(`.comments-count--shown`);
  const commentsCountAll = bigPicture.querySelector(`.comments-count--all`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);
  const commentsList = bigPicture.querySelector(`.social__comments`);

  const buildComment = (userComment) => {
    const newComment = window.util.createHtmlElement(`li`, `social__comment`);

    const newCommentAvatar = window.util.createHtmlElement(`img`, `social__picture`);
    newCommentAvatar.src = userComment.avatar;
    newCommentAvatar.alt = userComment.name;
    newCommentAvatar.width = CommentAvatarSize.WIDTH;
    newCommentAvatar.height = CommentAvatarSize.HEIGHT;

    newComment.appendChild(newCommentAvatar);

    const newCommentText = window.util.createHtmlElement(`p`, `social__text`);
    newCommentText.textContent = userComment.message;

    newComment.appendChild(newCommentText);

    return newComment;
  };

  const renderUserComments = (post, from, to) => {
    for (let i = from; i < to; i++) {
      commentsList.appendChild(buildComment(post.comments[i]));
    }
  };

  const shownUserComments = (userPost, commentIndexFrom = 0, commentIndexTo = 5) => {
    if (userPost.comments.length <= commentIndexTo) {
      commentIndexTo = userPost.comments.length;
      commentsLoader.classList.add(`hidden`);
    } else {
      commentsLoader.classList.remove(`hidden`);

      const onCommentsLoaderClick = () => {
        const indexFrom = commentIndexTo;
        const indexTo = indexFrom + COMMENTS_TO_SHOW;

        commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);

        shownUserComments(userPost, indexFrom, indexTo);
      };

      commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
    }

    commentsCountShown.textContent = commentIndexTo;

    renderUserComments(userPost, commentIndexFrom, commentIndexTo);
  };

  const renderBigPicture = (userPost) => {
    bigPictureImg.src = userPost.url;
    bigPictureDescription.textContent = userPost.description;
    likesCount.textContent = userPost.likes;
    commentsCountAll.textContent = userPost.comments.length;

    shownUserComments(userPost);
  };

  commentsLoader.classList.add(`hidden`);

  window.preview = {
    renderBigPicture
  };
})();
