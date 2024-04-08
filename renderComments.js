import { renderLogin } from "./addFormRender.js";
import { initPostButton } from "./initPostComment.js";
import { isInitiaLoading } from "./main.js"

export function renderComments(comments, appEl, isInitiaLoading) {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  
  const likeButtons = document.querySelectorAll('.like-button');
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


  const appHtml = `
      <div class = "container">  
        <ul id="comment-list" class="comments">
        ${isInitiaLoading ? "<div id='loader'>Загрузка комментариев...</div>" : usersHTML}
        </ul> 
        
        ${user ?
      `
          <div class="add-form" >
          <input
            id="add-name"
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            value=" ${user.name}" disabled
          />
          <textarea
            id="add-text"
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
            value=""
          ></textarea>
          <div class="add-form-row">
            <button id="add-button" class="add-form-button">Написать</button>
          </div>
        </div>
        `
      :
      `
        <div class = "form-loading" style="margin-top: 20px">
          Что бы добавить комментарий, <a href='#' id="go-to-login" href='#'>авторизуйтесь</a>
        </div> `
    }
      </div>`
  appEl.innerHTML = appHtml;

  const authLink = document.querySelector("#go-to-login");

  if (!user) {
    authLink.addEventListener("click", () => {
      renderLogin(comments, appEl);
    })
  } else {
    initPostButton()
  }

  for (const likeButton of likeButtons) {
    likeButton.addEventListener('click', (event) => {
      const index = parseInt(likeButton.getAttribute('data-index'));
      comments[index].isLiked = !comments[index].isLiked;

      if (comments[index].isLiked) {
        comments[index].likes += 1;
      } else {
        comments[index].likes -= 1;
      }
      event.stopPropagation();
      renderComments(comments, app)
    });
  };
  for (const comment of document.querySelectorAll("comments")) {
    comment.addEventListener('click', () => {
      const text = document.getElementById("add-text");
      text.value = `
        ${comments[comment.dataset.index].name}:
        ${comments[comment.dataset.index].text}
        `;
    });
  };
}