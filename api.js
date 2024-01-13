
const host = "https://wedev-api.sky.pro/api/v1/bulat-khasanov/comments";

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

export function postComment({name, date, text, likes, isLiked, forceError }) {
    return fetch(host, {
        method: "POST", 
        body: JSON.stringify({
          name: name,
          date: date,
          text: text,
          likes: likes,
          isLiked: isLiked, 
          forceError: forceError,
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