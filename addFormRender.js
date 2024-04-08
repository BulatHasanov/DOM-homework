import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export function addFormRender() {
    
}

export const renderLogin = (comments, appEl) => {
    let isLoginMode = true

    const renderForm = () => {
        appEl.innerHTML = `
        <div class="container">
            <div class="add-form" >
            ${isLoginMode 
                ? "" 
                : `
                <input
                    id="name-input"
                    type="text"
                    class="add-form-name"
                    placeholder="Имя"
                    style ='width:510px;'
                    value=""
                />
                <br>   
            `}
            <input
                id="login"
                type="text"
                class="add-form-name"
                placeholder="Логин"
                style ='width:510px;'
                value=""
            />   
            <br>     
            <input
                id="password"
                type="password"
                class="add-form-name"
                placeholder="Пароль"
                style ='width:510px;'
                value=""
            />
            <div class="add-form-row">
                <button id="auth-button" style ='width:556px;' class="add-form-button">${isLoginMode ? "Войти" : "Зарегестрироваться"}</button>
            </div>
            <div class="add-form-row">
                <button id="toggle-button" style ='width:556px;' class="add-form-button">Перейти ${isLoginMode ? "к авторизации" : "к регистрации"}</button>
            </div>
            </div>
        </div>`;

    const authButton = document.getElementById("auth-button");
    authButton.addEventListener("click", () => {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        fetchLogin(login, password).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.user));
            renderComments(comments, appEl);
        });

    });
    
    document.getElementById('toggle-button').addEventListener('click', ()=> {
        isLoginMode = !isLoginMode;
        renderForm()
    })
    }

    renderForm();

    // window.onload = function() {
    //     const loggedInUser = localStorage.getItem('loggedInUser');
    //     if (loggedInUser) {
    //         // Автоматически аутентифицируем пользователя
    //         fetchLogin(loggedInUser, localStorage.getItem(loggedInUser)).then((response) => {
    //             if (response.success) {
    //                 renderComments(comments, appEl,  response.user);
    //             } else {
    //                 // Обработка ошибки аутентификации
    //                 alert('Ошибка аутентификации: ' + response.message);
    //             }
    //         });
    //     }
    // };
};