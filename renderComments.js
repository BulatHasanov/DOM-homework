import { renderLogin } from "./addFormRender.js";


export function renderComments(comments, appEl, user) {

    const likeButtons = document.querySelectorAll('.like-button');
    const commentsList = document.getElementById("comment-list")
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
          <div id="loader" style = "
          display: none;
          text-align: center;
          font-size: 18px;
          font-weight:bold;
          margin: 20px 0;
          ">Загрузка комментариев...</div>
          ${usersHTML}
        </ul> 
        
        ${user ? 
          `
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
        </div>
        `
        :
        `
        <div class = "form-loading" style="margin-top: 20px">
          Что бы добавить комментарий, <a href='#' id="go-to-login" href='#'>авторизуйтесь</a>
        </div> `
      }
      </div>`
          
      const authLink = document.querySelector("#go-to-login");
      console.log(authLink)
      if(authLink) {
        authLink.addEventListener("click", () => {
          console.log(authLink);
          renderLogin();
        })
      }


    appEl.innerHTML = appHtml;
}