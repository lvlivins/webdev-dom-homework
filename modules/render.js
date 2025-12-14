import { initLikes } from './listener.js'
import { feedbackComments } from './listener.js'

export function renderComments(comments) {
    const container = document.getElementById('commentsContainer')
    container.innerHTML = comments
        .map(
            (comment, index) =>
                `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.userName}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.commentText}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}" data-index="${index}"></button>
          </div>
        </div>
        </li>`,
        )
        .join('')

    initLikes()
    feedbackComments()
}
