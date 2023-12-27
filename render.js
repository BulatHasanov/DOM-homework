import {initCommentAnswers, initLikesButtonListeners} from "./main.js";

const listElement = document.getElementById("comment-list");

export const renderComments = ({comments}) => {
    const usersHTML = comments.map((comment, index) => {
      return `
        <li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <div style="white-space: pre-line" class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
    }).join("");
    listElement.innerHTML = usersHTML;
    initCommentAnswers();
    initLikesButtonListeners();
  }
  
