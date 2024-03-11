import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export function addFormRender() {
    
}

export const renderLogin = (comments, appEl) => {
    appEl.innerHTML = `
        <div class="container">
            <div class="add-form" >
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
                <button id="auth-button" style ='width:556px;' class="add-form-button">Войти</button>
            </div>
            <div class="add-form-row">
                <button id="login-button" style ='width:556px;' class="add-form-button">Зарегистрироваться</button>
            </div>
            </div>
        </div>`;

    const authButton = document.getElementById("auth-button");
    authButton.addEventListener("click", () => {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        fetchLogin(login, password).then((response) => {
                localStorage.setItem(login, password);
            renderComments(comments, appEl,  response.user);
        });
    });
};