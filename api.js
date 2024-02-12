
const host = "https://wedev-api.sky.pro/api/v1/bulat-khasanov/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login"

export function  getComments() {
    return fetch(host, {
    method: "GET"
  })
  .then((response) => {
    if(response.status === 200) {
        return response.json()
      } else if (response.status === 500) {
        throw new Error('Сервер упал');
      } 
  })
}

export function fetchLogin(login, password) {
  return fetch(loginHost, {
    method: 'POST',
    body: JSON.stringify(
      {
        login,
        password,
      })
  })
    .then((response) => {
      return response.json();
    })
}

export function postComment({name, text}) {
    return fetch(host, {
        method: "POST", 
        body: JSON.stringify({
          name: name,
          text: text,
        }) 
      })
      .then((response) => { 
        if(response.status === 201) {
          return response.json()
        } else if (response.status === 400) {
          throw new Error('Короткое имя или комментарий');
        } else if (response.status === 500) {
          throw new Error('Сервер упал');
        } 
      })
}