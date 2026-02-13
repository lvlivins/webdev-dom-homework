import { comments } from './comments.js'
import { handlePostClick } from './api.js'
import { replaceAllEl } from './replaceAll.js'

export let countLikes = 0

export function btnFunction() {
    const buttonEl = document.querySelector('.add-form-button')

    buttonEl.addEventListener('click', () => {
        const inputEl = document.querySelector('.add-form-name')
        const textEl = document.querySelector('.add-form-text')
        const formLoadEl = document.createElement('div')
        const formEl = document.querySelector('.add-form')

        // проверка, чтобы все поля были заполнены
        if (inputEl.value === '') {
            inputEl.style.backgroundColor = 'red'
            inputEl.onfocus = function () {
                inputEl.style.backgroundColor = ''
            }
            return
        }
        if (textEl.value === '') {
            textEl.style.backgroundColor = 'red'
            textEl.onfocus = function () {
                textEl.style.backgroundColor = ''
            }
            return
        }

        handlePostClick()

        comments.push({
            userName: replaceAllEl(inputEl.value),
            date: `${new Date().toLocaleDateString('ru-RU', {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            })} ${new Date().toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
            commentText: replaceAllEl(textEl.value),
            likes: countLikes,
            isLiked: false,
        })

        if (navigator.onLine) {
            formEl.style.display = 'none'
            formLoadEl.style.display = 'flex'
            formEl.replaceWith(formLoadEl)
        }

        // renderComments(comments);// 2 отрисовка - локально показывается новый коммент
        // fetch post - перед очищением полей и после рендера
    })
}
