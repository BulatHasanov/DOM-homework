import {initCommentAnswers, initLikesButtonListeners} from "./main.js";


export const renderComments = ({comments}) => {
  const containerEl = document.getElementById("container");
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

    const containerHtml = `
          <ul id="comment-list" class="comments">
          </ul>
          <div id="loader">Загрузка комментариев...</div>
          ${containerEl}
          <div class="add-form" >
            <input
              id="add-login"
              type="text"
              class="add-form-name"
              placeholder="Логин"
              style ='width:510px;'
              value=""
            />   
            <br>     
            <input
              id="add-password"
              type="password"
              class="add-form-name"
              placeholder="Пароль"
              style ='width:510px;'
              value=""
            />
            <div class="add-form-row">
              <button id="login-button" style ='width:556px;' class="add-form-button">Войти</button>
            </div>
            <div class="add-form-row">
              <button id="login-button" style ='width:556px;' class="add-form-button">Зарегистрироваться</button>
            </div>
          </div>

          <div class="add-form" >
            <input
              id="add-name"
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя"
              value=""
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
          </div>`

          
    listElement.innerHTML = usersHTML;
    initCommentAnswers();
    initLikesButtonListeners();
  }
  
