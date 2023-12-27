
import {getComments, postComment} from "./api.js";
import { renderComments } from "./render.js"

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("comment-list");
const nameInputElement = document.getElementById("add-name");
const commentInput = document.getElementById("add-text");
let likeValue = document.getElementById('likesCounter');
let isOnline = navigator.onLine;

let comments = [];
let appComments = [];
initLikesButtonListeners();
fetchLoading();

window.addEventListener('offline', handleOffline);
window.addEventListener('online', handleOnline);

function handleOffline() {
  isOnline = false;
  alert("Отсутствует интернет");
}

function handleOnline() {
  isOnline = true;
  alert("Подключение восстановлено");
  fetchLoading();
}

function handleFetchError(error) {
  if(error.message === 'Короткое имя или комментарий') {
    alert('Имя и комметарий должен иметь больше 3-х символов');
  } else if (error.message === 'Сервер упал') {
    alert("Нет ответа от сервера");
  } else if (error.message === 'Отсутствует интернет') {
    alert("Отсутствует интернет");       
  } 
  buttonElement.disabled = false;
  buttonElement.textContent = 'Написать';
}

function  fetchLoading() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
  buttonElement.disabled = true;
  buttonElement.textContent = 'Подождите';

  nameInputElement.disabled = true;
  commentInput.disabled = true;

  if (!isOnline) {
    alert("Отсутствует интернет. Пожалуйста, проверьте ваше соединение и повторите попытку.");
    return;
  }
  getComments().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString(),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
        forceError: true,
      }
    })
    comments = appComments;
  })
  .then((data) => {
    loader.style.display = 'none';
    nameInputElement.disabled = false;
    commentInput.disabled = false;
    buttonElement.disabled = false;
    buttonElement.textContent = 'Написать'; 
    renderComments({comments});
  })
  .catch((error) => {
      handleFetchError(error);
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';
    })
}

// Функция для проставления лайков
export function initLikesButtonListeners() {
  const likeButtons = document.querySelectorAll('.like-button');

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      const index = parseInt(likeButton.getAttribute('data-index'));
      comments[index].isLiked = !comments[index].isLiked;

      if (comments[index].isLiked) {
        comments[index].likes += 1;
      } else {
        comments[index].likes -= 1;
      }
      event.stopPropagation();
      renderComments({comments});
    });
  }
};

// Функция для поиска индекса комментария в массиве
function findCommentIndex(replyText) {
  const repliedCommentName = replyText.substring(1, replyText.indexOf(',')); // Получаем имя комментатора из строки ответа
  return comments.findIndex(comment => comment.name === repliedCommentName);
}
// Отрисовка для ответов на комментарии
export const initCommentAnswers = () => {
  const commentsList = document.querySelectorAll('.comment');

  for (const comment of commentsList) {
      comment.addEventListener("click", (event) => {
        const index = parseInt(comment.getAttribute('data-index'));
        const selectedComment = comments[index];
        commentInput.value =
        `>${selectedComment.text}
        
        ${selectedComment.name}`;

        event.stopPropagation();
      });
  }
}


// Код для добавления комментария
buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove('error');
  commentInput.classList.remove('error');

  if (!isOnline) {
    alert("Отсутствует интернет. Пожалуйста, проверьте ваше соединение и повторите попытку.");
    return;
  }

  if ((nameInputElement.value === '') && (commentInput.value === '')) {
    nameInputElement.classList.add('error');
    commentInput.classList.add('error');
    return;
  } else if (commentInput.value === '') {
    commentInput.classList.add('error');
    return;
  } else if (nameInputElement.value === '') {
    nameInputElement.classList.add('error');
    return;
  }

  const nowDate = new Date();
  let dayNumb = nowDate.getDate();
  let monthNumb = nowDate.getMonth();
  let year = Math.abs(2000 - nowDate.getFullYear());
  if (dayNumb < 10) {
    dayNumb = "0" + dayNumb
  }
  if (monthNumb < 10) {
    monthNumb = "0" + monthNumb
  };
  const fullDate = dayNumb + "." + monthNumb + "." + year;
  let hour = nowDate.getHours(); 
  let minute = nowDate.getMinutes(); 
  if (minute < 10) {
    minute = "0" + minute;
  };
  const time = hour + ":" + minute;
  const oldListHtml = listElement.innerHTML;

  const isReply = commentInput.value.startsWith('@');
  const repliedCommentIndex = isReply ? findCommentIndex(commentInput.value) : -1;
  if (isReply && repliedCommentIndex !== -1) {
    comments[repliedCommentIndex].replies.push({
      name: nameInputElement.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
      fullDate: fullDate,
      time: time,
      commentText: commentInput.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
      likesCounter: 0,
      isLiked: false,
    });
  } else {
    buttonElement.disabled = true;
    buttonElement.textContent = 'Подождите';
    const fetchPromise = postComment({
      name: nameInputElement.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
      date: new Date().toLocaleString(),
      text: commentInput.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
      likes: '',
      isLiked: false, 
      forceError: true,
    }).then((responseData) => {
        return fetchLoading();
    })
    .then((data) => {
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';
      nameInputElement.value = '';
      commentInput.value = '';
    })
    .catch((error) => {
      handleFetchError(error);
      buttonElement.disabled = false;
      buttonElement.textContent = 'Написать';
    })
  };   
})    

renderComments({comments});
console.log("It works!");