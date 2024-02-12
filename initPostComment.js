import { postComment } from "./api.js";
import { appEl, comments } from "./main.js";
import { renderComments } from "./renderComments.js";

export function initPostButton() {
    const postButton = document.getElementById('add-button');
    if(postButton) {
        postButton.addEventListener("click", () => {
            postComment({
                name:document.getElementById('add-name').value,
                text:document.getElementById('add-text').value
            })
        }) 
    }
}