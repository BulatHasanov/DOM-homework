import { fetchLogin } from "./api.js";
import { renderComments } from "./renderComments.js";

export function addFormRender() {
    
}

export const renderLogin = (comments, appEl) => {
    appEl = `
        <div class="container">
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
        </div>`;
    const authButton = document.getElementById("auth-button");
    authButton.addEventListener("click", () => {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        fetchLogin(login, password).then((response) => {
            renderComments(isInitiaLoading, comments, app, isPosting, response.user);
        });
    });
};