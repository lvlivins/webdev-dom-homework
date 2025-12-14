import { renderComments } from './render.js'
// import { commentElements } from '../script.js'
// import { likeButtons } from '../script.js'
import { comments } from './comments.js'
import { textEl } from '../script.js'

export function initLikes() {
    const likeButtons = document.querySelectorAll('.like-button')
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation() // клик по лайку не должен вызывать feedbackComments
            const index = likeButton.dataset.index

            /*if (comments[index].isLiked === false) {
              comments[index].isLiked = true;
              comments[index].likes++;
            } else {
              comments[index].isLiked = false;
              comments[index].likes--;
            }
            renderComments(comments); // 3 отрисовка - локально комменты показывают лайк*/
            likeButton.classList.add('-loading-like')

            function delay(interval = 300) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, interval)
                })
            }

            delay(2000).then(() => {
                if (comments[index].isLiked === false) {
                    comments[index].isLiked = true
                    comments[index].likes++
                } else {
                    comments[index].isLiked = false
                    comments[index].likes--
                }
                likeButton.classList.remove('-loading-like')
                renderComments(comments)
            })
        })
    }
}

export function feedbackComments() {
    const commentElements = document.querySelectorAll('li')
    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index
            textEl.value = `> ${comments[index].userName} \n ${comments[index].commentText} \n`
        })
    }
}
