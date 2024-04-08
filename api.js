import { fetchLoading } from "./fetchAnswer.js";
import { appEl } from "./main.js";

const host = "https://wedev-api.sky.pro/api/v2/bulat-khasanov/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login"

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export function getComments() {
  return fetch(host)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else if (response.status === 500) {
        throw new Error('Сервер упал');
      }
    })
}

export function fetchLogin(login, password) {
  return fetch(loginHost, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {

      if (response.ok) {
        return response.json().then(data => {
          return data;
        });
      } else {
        throw new Error('Ошибка входа');
      };
    })
    .catch((error) => {
      throw error
    })

}
export function postComment({ name, text }) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      text: text,
    }),
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json()
      } else if (response.status === 400) {
        throw new Error('Короткое имя или комментарий');
      } else if (response.status === 500) {
        throw new Error('Сервер упал');
      }
    })
    .then(() => {
      return fetchLoading(appEl);
    })
}