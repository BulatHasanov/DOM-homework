import { setComments } from "./main.js";
import {getComments} from "./api.js";
import {renderComments} from "./renderComments.js"
import {comments} from "./main.js"

export function  fetchLoading() {

    // const loader = document.getElementById('loader');
    // loader.style.display = 'block';
    // buttonElement.disabled = true;
    // buttonElement.textContent = 'Подождите';
  
    // nameInputElement.disabled = true;
    // commentInput.disabled = true;
  
    // if (!isOnline) {
    //   alert("Отсутствует интернет. Пожалуйста, проверьте ваше соединение и повторите попытку.");
    //   return;
    //}
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
      setComments(appComments);
      renderComments(appComments);
      console.log(comments)
    })
    // .then((data) => {
    //   loader.style.display = 'none';
    //   nameInputElement.disabled = false;
    //   commentInput.disabled = false;
    //   buttonElement.disabled = false;
    //   buttonElement.textContent = 'Написать'; 
    //   startApp({comments});
    // })
    // .catch((error) => {
    //     handleFetchError(error);
    //     buttonElement.disabled = false;
    //     buttonElement.textContent = 'Написать';
    //   })
  }