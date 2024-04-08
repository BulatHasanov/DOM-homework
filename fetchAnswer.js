import { setComments } from "./main.js";
import {getComments} from "./api.js";
import {renderComments} from "./renderComments.js"
import { isInitiaLoading } from "./main.js";

export function  fetchLoading(appEl,isInitiaLoading) {


    getComments().then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString(),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        }
      })
        setComments(appComments);
        isInitiaLoading = false;
        renderComments(appComments, appEl);
    })

  }