import { postComment } from "./api.js";
import { fetchLoading } from "./fetchAnswer.js";
import { appEl, comments } from "./main.js";
import { renderComments } from "./renderComments.js";

function getToken() {
    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        return user.token || '';
    } else {
        return '';
    }
}

export function initPostButton(token) {
    const postForm = document.getElementById('add-button');
    if (postForm) {
        postForm.addEventListener("click", () => {
            // event.preventDefault();
            const name = document.getElementById('add-name').value;
            const text = document.getElementById('add-text').value;

            // const token = getToken();
            postComment({
                name,
                text,
                token
            })
            // .then(() => {
            //     document.getElementById('add-text').value = "";
            //     return getComments();
            // })
            // .then((responseData) => {
            //     comments = responseData.comments.map(comment => ({...comment, isLiked: false}));
            //     renderComments(comments, appEl);
            //     localStorage.setItem('token', token);
            // })
            .then((data) => {
                document.getElementById('add-text').value = "";
                // comments = data;
                comments.splice(0, comments.length, ...data);
                renderComments(comments, appEl);
                
                // localStorage.setItem('token', token);
                // fetchLoading(appEl);
                
            })
            .catch((error) => {
                if (error.message == "'Сервер упал'") {
                    // handleFetchError();
                    alert("Сервер сломался, попробуйте позже");
                  }
            
                  if (error.message == "'Короткий комментарий'") {
                    // handleFetchError();
                    alert("Коментарии должны быть не менее трех символов");
            
                    text.classList.add('-error');
                    setTimeout(() => {
                      text.classList.remove('-error');
                    }, 2000);
                  }
            })
            .finally(() => {
            //     localStorage.setItem('token', token);
                fetchLoading(appEl);
            });
            // // fetchLoading(appEl);
        }); 
    }
}

// window.addEventListener('load', () => {
//     initPostButton();
//     fetchLoading(appEl);
// });

window.addEventListener('load', () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        initPostButton(storedToken);
        // fetchLoading(appEl);
    }
});

