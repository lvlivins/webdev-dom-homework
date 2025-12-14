import { formEl } from '../script.js'
import { formLoadEl } from '../script.js'
import { loadEl } from '../script.js'
import { containerEl } from '../script.js'
import { textEl } from '../script.js'
import { inputEl } from '../script.js'

import { comments, updateComments } from './comments.js'
import { renderComments } from './render.js'

export const getAPI = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/lada-yarkova/comments')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // console.log(data)
            updateComments(data.comments)
            renderComments(comments)
        })
        .catch(() => {
            alert('У пользователя пропал интернет')
        })
        .finally(() => {
            formEl.style.display = 'flex'
            containerEl.classList.remove('disabled')
            loadEl.remove()
        })
}

export const handlePostClick = () => {
    fetch('https://wedev-api.sky.pro/api/v1/lada-yarkova/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: textEl.value,
            name: inputEl.value,
            forceError: true,
        }),
    })
        .then((response) => {
            // console.log(response.status);
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже')
            } else if (response.status === 400) {
                throw new Error(
                    'Имя и комментарий должны быть не короче 3 символов',
                )
            }
            return response.json()
        })
        .then(() => {
            //return Promise.reject('какая-то ошибка') - пример ошибки
            return getAPI()
        })
        //   .then(() => {
        //   return fetch('https://wedev-api.sky.pro/api/v1/lada-yarkova/comments');
        // }).then((response) => {
        //   return response.json();
        // })
        // .then((data) => {
        //   updateComments(data.comments);
        //   renderComments(comments);
        .then(() => {
            // очищение полей для нового ввода, после отрисовки нового комментария и передачи его в post
            inputEl.value = ''
            inputEl.style.backgroundColor = ''
            textEl.value = ''
            textEl.style.backgroundColor = ''
        })
        .catch((error) => {
            if (
                error.message ===
                    'NetworkError when attempting to fetch resource.' ||
                error.message === 'Failed to fetch'
            ) {
                alert('У пользователя пропал интернет')
            } else if (error.message === 'Сервер сломался, попробуй позже') {
                handlePostClick()
            } else {
                alert(error.message)
            }
        })
        .finally(() => {
            formLoadEl.style.display = 'none'
            formEl.style.display = 'flex'
            formLoadEl.replaceWith(formEl)
        })
}
